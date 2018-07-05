/*
 * 函数封装
 * @authors 祁俊
 */
import fs from "fs";
import path from "path";
import MyEncryptionUtil from "./MyEncryptionUtil";
import MyConfig from 'config-lite';
function YBVerify() {
    var join = path.join;
    var md5 = MyEncryptionUtil.md5;
    // 引入config文件
    const config = MyConfig;

    /**
     * 接口必传参数验证
     * 参数: 数组 ["product_id","company_id"]
     */
    this.verify_parameter = (parameter, fields) => {
        let {
            PARAM___user_name,
            PARAM___password,
            PARAM___repeat_password,
            PARAM___access_token,
            PARAM___user_id,
            PARAM___search_key,
            PARAM___page_number,
            PARAM___page_size,
            PARAM___name,
            PARAM___remark,
            PARAM___telephone,
            PARAM___id,
            PARAM___product_id,
            PARAM___type,
            PARAM___transaction_amount,
            PARAM___provider,
            PARAM___object_id,
            PARAM___customer,
            PARAM___products,
            PARAM___object_id_product,
            PARAM___object_id_batch,
            PARAM___name_product,
            PARAM___name_batch,
            PARAM___price,
            PARAM___count,
            PARAM___total_price,
            PARAM___,

        } = MyConstantUtil.PARAM;

        for (var i = 0;
            i < parameter.length;
            i++) {
            let key = parameter[ i ];
            let value = fields[ key ];
            if (
                // typeof value == 'undefined' || value == '' ||
                !value) {
                return {
                    passed : false,
                    key_name : key,
                };
            }
            /**
             * 对一些相对特殊的 key 做特殊验证
             */
            switch (key) {
                case PARAM___provider:
                case PARAM___customer:
                    if (
                        !value[ PARAM___object_id ]
                        ||
                        !value[ PARAM___name ]
                    ) {
                        return {
                            passed : false,
                            key_name : key,
                        };
                    }
                    break;
                case PARAM___products:
                    if (value.length > 0) {
                        let value_0 = value[ 0 ];
                        if (
                            !value_0[ PARAM___object_id_product ]
                            ||
                            !value_0[ PARAM___object_id_batch ]
                            ||
                            !value_0[ PARAM___name_product ]
                            ||
                            !value_0[ PARAM___name_batch ]
                            ||
                            !value_0[ PARAM___price ]
                            ||
                            !value_0[ PARAM___count ]
                            ||
                            !value_0[ PARAM___total_price ]
                        ) {
                            return {
                                passed : false,
                                key_name : key,
                            };
                        }
                    } else {
                        return {
                            passed : false,
                            key_name : key,
                        };
                    }

                    break;
            }
        }
        return {
            passed : true,

        };
    }

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
                if (stats.isDirectory()) {
                    finder(fPath);
                }
                if (stats.isFile()) {
                    result.push(fPath);
                }
            });
        }

        finder(startPath);

        for (var item of
            result) {
            var start = item.indexOf("B") + 1;
            var end = item.lastIndexOf("C");
            returnResult.push(item.substring(start, end).toLowerCase());
        }
        return returnResult;
    }

}

// 导出模块
export default new YBVerify();
