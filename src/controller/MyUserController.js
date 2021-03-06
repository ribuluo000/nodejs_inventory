/**
 * Created by nick on 2018/6/20.
 */
'use strict';

import MyModel from "../models/MyUserModel";
import MyBaseController from "./base/MyBaseController";
import crypto from "crypto";

function Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
}

function encryption(password) {
    const new_password = Md5(Md5(password).substr(2, 7) + Md5(password));
    return new_password
}

class MyController extends MyBaseController {

    /**
     *
     *
     * 绑定需要调用this. 相关方法：
     eg: this.login = this.login.bind(this);
     */
    constructor() {
        super()
    }

    async login(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___user__login;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {
            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    user_name,
                    password,
                } = fields;

                const new_password = encryption(password);
                try {
                    const result_findOne = await MyModel.findOne({ user_name });
                    if (!result_findOne) {
                        code = CODE.code_30001.code;
                        msg = MyConstantUtil.MSG.MSG___user_name_does_not_exist;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else if (new_password.toString() != result_findOne.password.toString()) {
                        console.log('登录密码错误');
                        code = CODE.code_30001.code;
                        msg = MyConstantUtil.MSG.MSG___password_error;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );

                        return;
                    } else {
                        msg = MyConstantUtil.MSG.MSG___login_success;

                        req.session.user_id = result_findOne._id;

                        let balance = result_findOne.balance;

                        let data = undefined;
                        data = {
                            'access_token' : 'access_token',
                            'user_id' : result_findOne._id,
                            'user' : result_findOne,
                            'balance' : balance,
                            'balance_string' : balance.toString(),
                        };
                        MyCommon.res_send_success(
                            msg,
                            data,
                            req_url,
                            res
                        );

                        return;
                    }
                } catch (err) {
                    console.log('登录失败', err);
                    msg = MyConstantUtil.MSG.MSG___login_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err,fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };

    async register(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___user__register;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {
            console.log(JSON.stringify(result_check_form_data));
            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    user_name,
                    password,
                } = fields;

                const new_password = encryption(password);
                try {
                    const result_findOne = await MyModel.findOne({ user_name })
                    if (result_findOne) {
                        console.log('该用户已经存在');
                        code = CODE.code_30002.code;
                        msg = MyConstantUtil.MSG.MSG___this_user_name_had_exist;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else {
                        const new_password = encryption(password);
                        const new_doc = {
                            user_name : user_name,
                            password : new_password,
                        };
                        let result_create = await MyModel.create(new_doc);

                        /**
                         *
                         { __v: 0,
                          user_name: 'user_name2',
                          password: 'q1PqLuhgbmaDU/SU+ClT/g==',
                          _id: 5b31d7a3e227cb4455f3ed13,
                          create_time: 2018-06-26T06:05:23.069Z,
                          balance: { '$numberDecimal': '0' } }
                         */
                        console.log(result_create);//返回的是插入的数据；

                        // const user2 = await MyModel.findOne({ user_name });
                        // req.session.user_id = user2._id;
                        msg = MyConstantUtil.MSG.MSG___register_success;
                        let data = undefined;
                        MyCommon.res_send_success(
                            msg,
                            data,
                            req_url,
                            res
                        );

                        return;
                    }
                } catch (err) {
                    console.log('注册失败', err);

                    msg = MyConstantUtil.MSG.MSG___register_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err,fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);

    };

    async logout(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___user__logout;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {

            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,

                } = fields;
                try {

                    //todo need change 删除 access_token

                    if (!true) {
                        console.log('退出登录失败');
                        code = CODE.code_30001.code;
                        msg = MyConstantUtil.MSG.MSG___logout_failure;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else {
                        msg = MyConstantUtil.MSG.MSG___logout_success;
                        let data = undefined;
                        MyCommon.res_send_success(
                            msg,
                            data,
                            req_url,
                            res
                        );
                        return;
                    }
                } catch (err) {
                    console.log('退出登录失败', err);
                    msg = MyConstantUtil.MSG.MSG___logout_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };
}

export default new MyController()