import formidable from "formidable";

/**
 * 对于一些系统错误使用该resSend
 * error:系统错误
 */
exports.res_send_sys_error = function (msg, req_url, res) {
    res.send({
        code : "10001",
        msg : msg,
        req_url : req_url
    });
};

exports.res_send_success = function (msg, data, req_url, res) {
    res.send({
        code : "0",
        msg : msg,
        req_url : req_url,
        data : data
    })
};

exports.res_send_error = function (code, msg, req_url, res) {
    res.send({
        code : code,
        msg : msg,
        req_url : req_url
    });
};

exports.get_must_pass_parameter = function (req_url) {
    let must_pass_parameter = [];
    let {

        REQ_URL___user__login,
        REQ_URL___user__register,
        REQ_URL___user__get_base_info,
        REQ_URL___user__logout,

        REQ_URL___provider__get_list,
        REQ_URL___provider__add,
        REQ_URL___provider__detail,
        REQ_URL___provider__update_detail,

        REQ_URL___customer__get_list,
        REQ_URL___customer__add,
        REQ_URL___customer__detail,
        REQ_URL___customer__update_detail,

        REQ_URL___bill__get_list,
        REQ_URL___bill__add,
        REQ_URL___bill__detail,

        REQ_URL___product__get_list,
        REQ_URL___product__add,
        REQ_URL___product__detail,
        REQ_URL___product__update_detail,

        REQ_URL___product__batch__get_list,
        REQ_URL___product__batch__add,
        REQ_URL___product__batch__detail,
        REQ_URL___product__batch__update_detail,

        REQ_URL___,

    } = MyConstantUtil.REQ_URL;
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

    /**
     * 只有完全一样的必传参数，才能用同一段代码，
     * 如果不完全一样，那么就要单独写出来，不能影响其他的。
     */
    switch (req_url) {

        case REQ_URL___user__register:
            must_pass_parameter.push(
                PARAM___user_name,
                PARAM___password,
                PARAM___repeat_password,
            );
            break;
        case REQ_URL___user__login:
            must_pass_parameter.push(
                PARAM___user_name,
                PARAM___password,
            );
            break;
        case REQ_URL___:
        /**
         * update
         */
        case REQ_URL___provider__update_detail:
        case REQ_URL___customer__update_detail:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___id,
                PARAM___name,
                // PARAM___remark,
                PARAM___telephone,
            );
            break;
        case REQ_URL___product__update_detail:
        case REQ_URL___product__batch__update_detail:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___id,
                PARAM___name,
                // PARAM___remark,
            );
            break;


        /**
         * detail
         */
        case REQ_URL___provider__detail:
        case REQ_URL___customer__detail:
        case REQ_URL___product__detail:
        case REQ_URL___product__batch__detail:
        case REQ_URL___bill__detail:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___id,
            );
            break;

        /**
         * add
         */
        case REQ_URL___product__add:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___name,
                // PARAM___remark,
            );
            break;
        case REQ_URL___product__batch__add:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___name,
                // PARAM___remark,
                PARAM___product_id,
            );
            break;
        case REQ_URL___provider__add:
        case REQ_URL___customer__add:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___name,
                // PARAM___remark,
                PARAM___telephone,
            );
            break;

        case REQ_URL___bill__add:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                PARAM___type,
                // PARAM___remark,
                PARAM___transaction_amount,

                /**
                 *
                 *


                 PARAM___provider,
                 PARAM___customer,
                 PARAM___products,

                 "provider":{
                    "object_id":"object_id",
                    "name":"name"
                    },
                 "customer":{
                    "object_id":"object_id",
                    "name":"name"
                    },
                 "products":[
                 {
                     "object_id_product":"object_id_product",
                     "object_id_batch":"object_id_batch",
                     "name_product":"name_product",
                     "name_batch":"name_batch",
                     "remark":"remark",
                     "price":10,
                     "count":10,
                     "total_price":100
                 }
                 ]


                 */
                // PARAM___provider,
                // PARAM___customer,
                // PARAM___products,
            );
            break;

        /**
         * list
         */
        case REQ_URL___provider__get_list:
        case REQ_URL___customer__get_list:
        case REQ_URL___product__get_list:
        case REQ_URL___bill__get_list:

            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                // PARAM___search_key,
                PARAM___page_number,
                PARAM___page_size,
            );
            break;
        case REQ_URL___product__batch__get_list:

            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
                // PARAM___search_key,
                PARAM___page_number,
                PARAM___page_size,
                PARAM___product_id,
            );
            break;

        case REQ_URL___user__logout:
        case REQ_URL___user__get_base_info:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
            );
            break;
        default:
            must_pass_parameter.push(
                PARAM___access_token,
                PARAM___user_id,
            );
            break;
    }

    return must_pass_parameter;

};

/**
 *
 * @param code
 * @param msg
 * @param req_url
 * @param res
 * @param req
 * @param next
 * @param callback  检验完成后的回调方法
 */
exports.check_form_data = function (code, msg, req_url, res, req, next, callback) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        console.log(JSON.stringify(fields));

        if (err) {
            code = CODE.code_40001.code;
            msg = MyConstantUtil.MSG.MSG___request_data_error;
            MyCommon.res_send_error(
                code,
                msg,
                req_url,
                res
            );
            // callback({
            //     passed:false,
            // });
            return false;
        }

        let must_pass_parameter = MyCommon.get_must_pass_parameter(req_url);
        let b = MyVerifyUtil.verify_parameter(
            must_pass_parameter,
            fields
        );
        if (!b.passed) {
            code = CODE.code_40001.code;
            msg = b.key_name + i18n.__('error');
            MyCommon.res_send_error(
                code,
                msg,
                req_url,
                res
            );
            // callback({
            //     passed:false,
            // });
            return false;
        }

        callback({
            passed : true,
            fields : fields,
        });
        return true;
    })
};

exports.on_catch_error = function (msg, req_url, res, err, fields) {

    console.log('name:', err.name);
    console.log('message:', err.message);
    console.log('codeName:', err.codeName);
    let code = '10001';
    if (err.codeName === MyConstantUtil.TYPE.TYPE_ERROR.DuplicateKey || (err.message && err.message.indexOf('duplicate key error') > -1)) {
        let duplicate_value = '';
        duplicate_value = err.message.split('\"')[ 1 ];

        code = CODE.code_30002.code;
        msg = duplicate_value + MyConstantUtil.MSG.MSG___had_exist;
        MyCommon.res_send_error(
            code,
            msg,
            req_url,
            res
        );
        return;
    }
    let cur_time = MyDateTimeUtil.format2YYYY_MM_DD__HH_mm_ss(MyDateTimeUtil.nowTime());

    MyLogError.error(`
                
                err___
                day::${cur_time}__\n
                msg::${req_url}__\n
                req_url::${msg}__\n
                err::${JSON.stringify(err)}__\n
                fields::${JSON.stringify(fields)}__\n
                `);

    MyCommon.res_send_sys_error(
        msg,
        req_url,
        res
    );

};





