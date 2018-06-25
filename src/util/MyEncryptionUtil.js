// 专用的加密模块,所有加密方法全部从这里调用

import crypto from 'crypto';

// MD5加密
const md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);


    str = md5sum.digest('hex');
    return str;
};

// sha1加密
const sha1 = function(str) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);


    str = sha1.digest('hex');
    return str;
};

// crypto加密函数库
let MyEncryptionUtil = {
    crypto:crypto,
    sha1:sha1,
    md5:md5,
};


export default MyEncryptionUtil;