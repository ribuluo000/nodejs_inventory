/**
 * Created by nick on 2018/6/20.
 */
'use strict';

import YBUserModel from "../models/YBUserModel";
import YBBaseController from "./base/YBBaseController";
import formidable from "formidable";
import crypto from 'crypto'

class YBUserController extends YBBaseController {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }


    async login(req, res, next) {
        let req_url = '/user/login';

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    code : 1,
                    req_url : req_url,
                    msg : '表单信息错误'
                })
                return
            }
            const { user_name, password, } = fields;
            try {
                if (!user_name) {
                    throw new Error('用户名参数错误')
                } else if (!password) {
                    throw new Error('密码参数错误')
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    code : 1,
                    req_url : req_url,
                    msg : err.message,
                })
                return
            }
            const newpassword = this.encryption(password);
            try {
                const user = await YBUserModel.findOne({ user_name })
                if (!user) {
                    res.send({
                        code : 1,
                        req_url : req_url,
                        msg : '用户名不存在',
                    })
                } else if (newpassword.toString() != user.password.toString()) {
                    console.log('登录密码错误');
                    res.send({
                        code : 1,
                        req_url : req_url,
                        msg  : '该用户已存在，密码输入错误',
                    })
                } else {
                    req.session.user_id = user._id;
                    res.send({
                        code : 0,
                        req_url : req_url,
                        msg  : '登录成功',
                        data : {
                            'access_token':'access_token',
                            'user_id':user._id,
                        }
                    })
                }
            } catch (err) {
                console.log('登录失败', err);
                res.send({
                    code : 1,
                    req_url : req_url,
                    msg  : '登录失败',
                })
            }
        })
    };
    async register (req, res, next) {
        let req_url = '/user/register';
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    code : 1,
                    req_url : req_url,
                    msg : '表单信息错误'
                })
                return
            }
            const { user_name, password } = fields;
            try {
                if (!user_name) {
                    throw new Error('用户名错误')
                } else if (!password) {
                    throw new Error('密码错误')
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    code : 1,
                    req_url : req_url,
                    msg : err.message,
                })
                return
            }
            try {
                const user = await YBUserModel.findOne({ user_name })
                if (user) {
                    console.log('该用户已经存在');
                    res.send({
                        code : 1,
                        req_url : req_url,
                        msg : '该用户已经存在',
                    })
                } else {
                    const newpassword = this.encryption(password);
                    const newUser = {
                        user_name:user_name,
                        password : newpassword,
                    }
                    await YBUserModel.create(newUser);
                    // const user2 = await YBUserModel.findOne({ user_name });
                    // req.session.user_id = user2._id;
                    res.send({
                        code : 0,
                        req_url : req_url,
                        msg : '注册成功',
                    })
                }
            } catch (err) {
                console.log('注册失败', err);
                res.send({
                    code : 1,
                    req_url : req_url,
                    message : '注册失败',
                })
            }
        })
    };
}

export default new YBUserController()