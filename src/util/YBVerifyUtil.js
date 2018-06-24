/*
 * 函数封装
 * @authors 祁俊
 */

function YBVerify() {
    var fs = require('fs');
    var join = require('path').join;
    var md5 = require('./YBEncryption').md5;
    let path = require('path');
    // 引入config文件
    const config = require('../common/config');

    //手机验证
    this.verifyTelphone = function (str) {
        var istelephone = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        return istelephone.test(Number(str));
    }

    //邮箱验证
    this.verifyEmail = function (str) {
        var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return isemail.test(str);
    }

    /*
     * 固话验证
     */
    this.verifyPhone = function (str) {
        var isphone = /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/;
        return isphone.test(Number(str));
    }

    //验证是否为字母
    this.verifyEn = function (str) {
        var isEn = /^[a-zA-Z]+$/;
        return isEn.test(str);
    }

    //密码密码验证[6-16位]
    this.verifyPassword = function (str) {
        var isPassword = /^[0-9a-zA-Z`~!@#$%^&*()-_+=\{\}\[\]\;\:\"\'\?\/\\]{6,16}$/;
        return isPassword.test(str);
    }


    //获得controllers文件下对应名字[参考原routes下的apiObjs]
    this.verifyFindController = function (startPath) {
        var result = [];
        var returnResult = [];

        function finder(path) {
            var files = fs.readdirSync(path);
            files.forEach((val, index) => {
                var fPath = join(path, val);
                var stats = fs.statSync(fPath);
                if (stats.isDirectory()) finder(fPath);
                if (stats.isFile()) result.push(fPath);
            });
        }

        finder(startPath);

        for (var item of result) {
            var start = item.indexOf("B") + 1;
            var end = item.lastIndexOf("C");
            returnResult.push(item.substring(start, end).toLowerCase());
        }
        return returnResult;
    }



    /**
     * 接口必传参数验证
     * 参数: 数组 ["product_id","company_id"]
     */
    this.verify_parameter = (parameter, req) => {
        for (var i = 0; i < parameter.length; i++) {
            let key = parameter[i];
            let key_name = req.params[key];
            if (typeof key_name == 'undefined' || key_name == '' || !key_name) {
                return false;
            }
        }
        return true;
    }


}


// 导出模块
module.exports = new YBVerify();
