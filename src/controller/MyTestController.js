/**
 * Created by nick on 2018/6/20.
 */
'use strict';

import MyBaseController from "./base/MyBaseController";

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

    async test1(req, res, next) {
        let req_url = '/test/test1';
        let msg = 'test MyPermissionUtil';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {

            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,
                    name,
                    remark,
                    telephone,
                } = fields;

                try {

                    MyPermissionUtil.test();

                    msg = 'test MyPermissionUtil success';
                    let data = undefined;
                    MyCommon.res_send_success(
                        msg,
                        data,
                        req_url,
                        res
                    );
                    return;
                } catch (err) {
                    console.log('test err', err);
                    msg = MyConstantUtil.MSG.MSG___add_provider_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);

    };

}

export default new MyController()