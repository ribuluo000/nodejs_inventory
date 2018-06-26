/**
 * 用于定义全局模块
 */
import MyConfig from '../common/config';
import i18n_module from 'i18n-nodejs';
var i18n = new i18n_module(MyConfig.i18n_config.lang, MyConfig.i18n_config.langFile);
global.i18n = i18n;

import MyConstantUtil from './MyConstantUtil';
import MyEncryptionUtil from './MyEncryptionUtil';
import MyArrayUtil from './MyArrayUtil';
import MyDateTimeUtil from './MyDateTimeUtil';
import MyStringUtil from './MyStringUtil';
import MyAccessLogUtil from './MyAccessLogUtil';
import MyHttpUtil from './MyHttpUtil';
import MyLogUtil from './MyLogUtil';
import MyVerifyUtil from './MyVerifyUtil';
import uuid from 'node-uuid';
import async from 'async';
import MyCommon from '../common/MyCommon';
import db from '../common/db';
import _ from 'lodash';
import {Decimal} from 'decimal.js';
global.CODE = MyConstantUtil.CODE;


console.log(i18n.__('Welcome'));

// 全局打印模块
global.MyConstantUtil = MyConstantUtil;
global.MyEncryptionUtil = MyEncryptionUtil;
global.MyArrayUtil = MyArrayUtil;
global.MyDateTimeUtil = MyDateTimeUtil;
global.MyStringUtil = MyStringUtil;
global.MyAccessLogUtil = MyAccessLogUtil;
global.MyHttpUtil = MyHttpUtil;
global.MyLogUtil = MyLogUtil;
global.MyLog = MyLogUtil.logger;
global.MyVerifyUtil = MyVerifyUtil;
global.MyCommon = MyCommon;
global.MyConfig = MyConfig;
global.async = async;
global.uuid = uuid;
global._ = _;
global.Decimal = Decimal;
global.db = db;
global.mongodb_conn1 = db.mongodb_conn1;
global.mongodb_conn2 = db.mongodb_conn2;
global.redis_db0 = db.redis_db0;
global.redis_db1 = db.redis_db1;


// console.log(MyConstantUtil);
// console.log(global);


const MyGlobalUtil = {
    init:()=>{},
};

export default MyGlobalUtil;

//
// global.YBVerifyTool = require('../util/YBVerifyUtil');
// global.YBTokenVerify = require('../util/YBTokenVerify');
// global.YBRedisTool = require('../util/YBRedisTool');