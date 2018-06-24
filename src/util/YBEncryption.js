// 专用的加密模块,所有加密方法全部从这里调用

var crypto = require("crypto");

// MD5加密
exports.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);


    str = md5sum.digest('hex');
    return str;
};

// sha1加密
exports.sha1 = function(str) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(str);


    str = sha1.digest('hex');
    return str;
};

// crypto加密函数库
exports.crypto = crypto;