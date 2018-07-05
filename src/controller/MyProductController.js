/**
 * Created by nick on 2018/6/20.
 */
'use strict';

import MyModel from "../models/MyProductModel";
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

    async add(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___product__add;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {
            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,
                    name,
                    remark,
                } = fields;

                try {

                    const new_doc = {
                        object_id_created_by : user_id,
                        name,
                        remark,
                    };
                    let result_create = await MyModel.create(new_doc);
                    console.log(result_create);
                    msg = MyConstantUtil.MSG.MSG___add_product_success;
                    let data = undefined;
                    MyCommon.res_send_success(
                        msg,
                        data,
                        req_url,
                        res
                    );
                    return;
                } catch (err) {
                    console.log('添加失败', err);
                    msg = MyConstantUtil.MSG.MSG___add_product_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);

    };

    async update_detail(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___product__update_detail;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {

            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,
                    name,
                    remark,
                    id,

                } = fields;

                try {
                    let update = {
                        name,
                        remark,
                    };
                    const result_findByIdAndUpdate = MyModel.findByIdAndUpdate(id, update,);
                    const callback_result_findByIdAndUpdate_exec = (err, doc) => {
                        console.log('更新', err, doc);

                        if (err) {
                            console.log('更新失败', err);

                            msg = MyConstantUtil.MSG.MSG___update_product_failure;
                            MyCommon.on_catch_error(msg, req_url, res, err, fields);

                            return;
                        }

                        if (!doc) {
                            code = CODE.code_30001.code;
                            msg = MyConstantUtil.MSG.MSG___this_product_does_not_exist;
                            MyCommon.res_send_error(
                                code,
                                msg,
                                req_url,
                                res
                            );

                            return;
                        }
                        console.log('更新成功', doc);

                        msg = MyConstantUtil.MSG.MSG___update_product_success;
                        let data = undefined;
                        MyCommon.res_send_success(
                            msg,
                            data,
                            req_url,
                            res
                        );

                        return;
                    };
                    result_findByIdAndUpdate.exec(callback_result_findByIdAndUpdate_exec);

                } catch (err) {
                    console.log('更新失败', err);

                    msg = MyConstantUtil.MSG.MSG___update_product_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);

    };

    async detail(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___product__detail;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {

            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,
                    id,

                } = fields;
                try {
                    const result_findById = await MyModel.findById(id);
                    console.log('result_findById', result_findById);
                    if (!result_findById) {
                        console.log('查询产品失败');
                        code = CODE.code_30001.code;
                        msg = MyConstantUtil.MSG.MSG___this_product_does_not_exist;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else {
                        msg = MyConstantUtil.MSG.MSG___find_product_success;

                        let data = undefined;
                        data = result_findById;
                        MyCommon.res_send_success(
                            msg,
                            data,
                            req_url,
                            res
                        );
                        return;
                    }
                } catch (err) {
                    console.log('查询产品失败', err);
                    msg = MyConstantUtil.MSG.MSG___find_product_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };

    async get_list(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___product__get_list;
        let msg = '';
        let code = '';

        const callback_check_form_data = async (result_check_form_data) => {
            if (result_check_form_data.passed) {
                const fields = result_check_form_data.fields;

                const {
                    access_token,
                    user_id,
                    search_key,
                    page_number,
                    page_size,
                } = fields;
                try {
                    const result_paginate = await MyModel.paginate({object_id_created_by:user_id}, { sort:'-create_time',page : page_number, limit : page_size });

                    /**
                     result_paginate { docs: [], total: 0, limit: 10, page: 3, pages: 1 }
                     console.log('result_paginate', result_paginate);
                     */

                    if (result_paginate.docs.length === 0) {
                        console.log('没有更多数据');
                        code = CODE.code_20001.code;
                        msg = MyConstantUtil.MSG.MSG___no_more_data;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else {
                        console.log('查询产品列表成功');
                        msg = MyConstantUtil.MSG.MSG___find_product_list_success;

                        let data = undefined;
                        data = {
                            'total_count' : result_paginate.total,
                            'data_list' : result_paginate.docs,
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
                    console.log('查询产品列表失败', err);
                    msg = MyConstantUtil.MSG.MSG___find_product_list_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };

}

export default new MyController()