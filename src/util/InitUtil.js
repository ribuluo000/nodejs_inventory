/**
 * Created by nick on 2018/1/27.
 */
var AccessLogUtil = require('./AccessLogUtil');
var LogUtil = require('./LogUtil');
var YBGlobal = require('../common/YBGlobal');

class InitUtil{
    init(app){
        AccessLogUtil.init(app);
        LogUtil.init(app);

    }
}

module.exports = new InitUtil();

