/**
 * Created by nick on 2018/6/20.
 */
'use strict';

import MyModel from "../models/MyBillModel";
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
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___bill__add;
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
                    type,
                    transaction_amount,

                    provider,
                    customer,
                    products,
                } = fields;

                const check_form_data_detailed = () => {
                    let result_check_form_data_detailed = { passed : false, key_name : '' };
                    let key = '';
                    let value = '';
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

                    } = PARAM;

                    {

                        const error_type = () => {
                            key = PARAM___type;
                            msg = MSG.MSG___bill_type_is_incorrect;
                            let err = msg;
                            MyCommon.on_catch_error(msg, req_url, res, err, fields);
                            result_check_form_data_detailed = { passed : false, key_name : key };
                            return result_check_form_data_detailed;
                        };
                        const error_provider = () => {
                            key = PARAM___customer;
                            msg = MSG.MSG___provider_is_incorrect;
                            let err = msg;
                            MyCommon.on_catch_error(msg, req_url, res, err, fields);
                            result_check_form_data_detailed = { passed : false, key_name : key };
                            return result_check_form_data_detailed;
                        };
                        const error_customer = () => {
                            key = PARAM___customer;
                            msg = MSG.MSG___customer_is_incorrect;
                            let err = msg;
                            MyCommon.on_catch_error(msg, req_url, res, err, fields);
                            result_check_form_data_detailed = { passed : false, key_name : key };
                            return result_check_form_data_detailed;
                        };

                        key = PARAM___type;
                        if (type === TYPE.TYPE_BILL.pay_money) {
                            if (customer) {
                                return error_customer();
                            }
                            if (provider) {

                                value = provider;
                                if (
                                    !value[ PARAM___object_id ]
                                    ||
                                    !value[ PARAM___name ]
                                ) {
                                    return error_provider();
                                }

                            } else {
                                return error_provider();
                            }

                        } else if (type === TYPE.TYPE_BILL.receive_money) {
                            if (provider) {
                                return error_provider();
                            }
                            if (customer) {

                                value = customer;
                                if (
                                    !value[ PARAM___object_id ]
                                    ||
                                    !value[ PARAM___name ]
                                ) {
                                    return error_customer();
                                }

                            } else {
                                return error_customer();
                            }
                        } else {
                            return error_type();

                        }
                    }

                    {
                        const error_products = () => {
                            key = PARAM___products;
                            msg = MSG.MSG___products_is_incorrect;
                            let err = msg;
                            MyCommon.on_catch_error(msg, req_url, res, err, fields);
                            result_check_form_data_detailed = { passed : false, key_name : key };
                            return result_check_form_data_detailed;
                        };

                        key = PARAM___products;
                        let value = products;
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
                                return error_products();
                            }
                        } else {
                            return error_products();

                        }
                    }

                    return { passed : true, key_name : '' }

                };
                let result_check_form_data_detailed = check_form_data_detailed();
                if (!result_check_form_data_detailed.passed) {
                    return;
                }

                try {

                    const new_doc = {
                        object_id_created_by : user_id,
                        name,
                        remark,
                        type,
                        transaction_amount,

                        provider,
                        customer,
                        products,
                    };
                    let result_create = await MyModel.create(new_doc);
                    console.log(result_create);
                    msg = MyConstantUtil.MSG.MSG___add_bill_success;
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
                    msg = MyConstantUtil.MSG.MSG___add_bill_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);

    };

    async detail(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___bill__detail;
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
                        console.log('查询账单失败');
                        code = CODE.code_30001.code;
                        msg = MyConstantUtil.MSG.MSG___this_bill_does_not_exist;
                        MyCommon.res_send_error(
                            code,
                            msg,
                            req_url,
                            res
                        );
                        return;
                    } else {
                        msg = MyConstantUtil.MSG.MSG___find_bill_success;

                        let data = null;
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
                    console.log('查询账单失败', err);
                    msg = MyConstantUtil.MSG.MSG___find_bill_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };

    async get_list(req, res, next) {
        let req_url = MyConstantUtil.REQ_URL.REQ_URL___bill__get_list;
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
                    const result_paginate = await MyModel.paginate({}, { page : page_number, limit : page_size });

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
                        console.log('查询账单列表成功');
                        msg = MyConstantUtil.MSG.MSG___find_bill_list_success;

                        let data = null;
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
                    console.log('查询账单列表失败', err);
                    msg = MyConstantUtil.MSG.MSG___find_bill_list_failure;
                    MyCommon.on_catch_error(msg, req_url, res, err, fields);

                }
            }

        };

        MyCommon.check_form_data(code, msg, req_url, res, req, next, callback_check_form_data);
    };

}

export default new MyController()