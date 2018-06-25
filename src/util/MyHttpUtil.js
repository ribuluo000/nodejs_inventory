/**
 * 封装Fetch请求 统一接口
 */
import request from 'request';
import node_fetch from 'node-fetch';
import async from 'async';
import MyConfig from '../common/config';
import db from '../common/db';

const config = MyConfig;
const redis_db1 = db.redis_db1;

class MyHttpUtil {
    MyFetch(url, option, callback) {
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
    MyRequest(url, formData, callback) {
        request.post({url: url, formData: formData}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            }else{
                callback(error, null);
            }
        })
    }


}

export default new MyHttpUtil();
