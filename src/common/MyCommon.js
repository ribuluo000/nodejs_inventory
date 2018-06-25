

/**
 * 对于一些系统错误使用该resSend
 * error:系统错误
 */
exports.res_send_sys_error = function (error, req_url, res) {
    res.send({
        code: "10001",
        error_msg: error,
        req_url: req_url
    });
}

exports.res_send_success = function (data, req_url, res) {
    res.send({
        code: "0",
        error_msg: "ok",
        req_url: req_url,
        data: data
    })
};


exports.res_send_error = function (code,error, req_url, res) {
    res.send({
        code: code,
        error_msg: error,
        req_url: req_url
    });
};




