/**
 * Created by nick on 2018/1/27.
 */

import MyGlobalUtil from './MyGlobalUtil';

import MyAccessLogUtil from './MyAccessLogUtil';
import MyLogUtil from './MyLogUtil';
class InitUtil{
    init(app){
        MyAccessLogUtil.init(app);
        MyLogUtil.init(app);

    }
}

module.exports = new InitUtil();

