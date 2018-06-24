/**
 * 负责token验证模块：YBTokenVerify
 */

/**
 * 业务逻辑:
 * 1.用户通过手机号和密码注册
 * 2.用户通过用户名和密码过去mobile_token(7天有效期)或browser_token(有效期2天)
 * 3.前端通过mobile_token或browser_token换取access_token(有效时间5小时)
 */

// 引入token验证模块
var jwt = require('jsonwebtoken');
var config = YBConfig;
var redis_db0 = require('../common/db.js').redis;
var md5 = require('./YBEncryption.js').md5;

function YBTokenVerify() {
    // 创建Token
    this.createToken = function(tokenObj, secrit) {
        // 创建token
        var token = jwt.sign(tokenObj, secrit);
        // 返回Token
        return token;
    }

    // 验证Token
    this.verifyToken = function(token, secrit, callback) {
        jwt.verify(token, secrit, function(error, decode) {
            if (error) {
                callback(error);
            } else {
                callback(null, decode);
            }
        });
    }

    //验证accesstoken
    this.verify_access_token = function(from,user_id,access_token, callback) {
        if(from == 'APP'){
            var key = 'APPAccess_token:'+md5(access_token);
            redis_db0.get(key,function(error,response){
                        if(error){
                            callback(error,null)
                        }else{
                            // if(user_id == response){
                            //     callback(null,response)
                            // }else if(!response){
                            //     callback('access_token过期，请重新登录',null)
                            // }else{
                            //     callback('user_id与access_token有误',null)
                            // }
                            if(!response){
                                callback('access_token过期，请重新登录',null)
                            }else{
                                redis_db0.expire(key,24*30*60*60);
                                callback(null,response)
                            }
                        }
                 }) 
        }else {
            var key = 'PCAccess_token:'+md5(access_token);
            redis_db0.get(key,function(error,response){
                        if(error){
                            callback(error,null)
                        }else{
                            // if(user_id == response){
                            //     callback(null,response)
                            // }else if(!response){
                            //     callback('access_token过期，请重新登录',null)
                            // }else{
                            //     callback('user_id与access_token有误',null)
                            // }
                            if(!response){
                                callback('access_token过期，请重新登录',null)
                            }else{
                                redis_db0.expire(key,8*60*60);
                                callback(null,response)
                            }
                        }
                 }) 
        }

        // jwt.verify(access_token, config.jwt.access_token_secrit, function(error, response) {
        //     if (error) {
        //         callback(error);
        //     } else {
        //         callback(null, response);
        //     }
        // })
    }

    // 通过(mobile_token或browser_token)换取access_token
    this.get_access_token = function(from,user_id, token, secrit, callback) {
        // 验证mobile_token或browser_token是否正确
        var self_this = this;
        this.verifyToken(token, secrit, function(error, response) {
            if (error) {
                callback(error);
            } else {
                var user = {};
                user.user_id = user_id;
                if(from == 'APP'){
                    var access_token_obj = {
                            exp: Math.floor(Date.now()/1000) + 24*30*60*60, // 一个月
                            token: token,
                            user: user.user_id
                        }
                        // 传入access_token_secrit来创建新的accesstoken
                    access_token = self_this.createToken(access_token_obj, config.jwt.access_token_secrit);
                    //将access_token作为key值，user_id作为value值存入到redis，留待登录时的身份验证
                    var key = 'APPAccess_token:'+md5(access_token);
                    redis_db0.set(key,JSON.stringify({user_id:user.user_id,access_token:access_token}),function(error,response){
                        if(error){
                            callback(error,null)
                        }else{
                            redis_db0.expire(key,24*30*60*60)
                            callback(null, access_token);
                        }
                    }) 
                }else if(from == 'PC'){
                    // 通过token去换取相应的access_token
                    var access_token_obj = {
                            exp: Math.floor(Date.now()/1000) + 8*60*60, // 8小时候过期
                            token: token,
                            user: user.user_id
                        }
                        // 传入access_token_secrit来创建新的accesstoken
                    access_token = self_this.createToken(access_token_obj, config.jwt.access_token_secrit);
                    //将access_token作为key值，user_id作为value值存入到redis，留待登录时的身份验证
                    var key = 'PCAccess_token:'+md5(access_token);
                    redis_db0.set(key,JSON.stringify({user_id:user.user_id,access_token:access_token}),function(error,response){
                        if(error){
                            callback(error,null)
                        }else{
                            redis_db0.expire(key,8*60*60)
                            callback(null, access_token);
                        }
                    })  
                }

            }
        })
    }
}

module.exports = new YBTokenVerify();