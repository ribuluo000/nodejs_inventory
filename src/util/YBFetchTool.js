/**
 * 封装Fetch请求 统一接口
 */
const node_fetch = require('node-fetch');
const request = require('request');
const async = require('async');
const config = require('../common/config');
const redis_db1 = require('../common/db').redis_db1;

class YBFetchTool {
    YBFetch(url, option, callback) {
        node_fetch(url, {
            method: 'POST',
            body: JSON.stringify(option),
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => callback(null, json));
    }

    /**
     * POST multipart/form-data
     */
    Request(url, formData, callback) {
        request.post({url: url, formData: formData}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            }else{
                callback(error, null);
            }
        })
    }


}

module.exports = new YBFetchTool();
