/**
 * 用于定义全局模块
 */
// 全局打印模块
global.YBConfig = require('../common/config');
global.YBLog = require('../src/util/LogUtil').logger;
global.mongoose = require('../common/db').mongoose;
global.mongodbConn = require('../common/db').conn1;
global.redisConn = require('../common/db').redis;
global.async = require('async');
global.uuid = require('node-uuid');
global.Common = require('../common/YBCommons');
global._ = require('lodash');

global.YBVerifyTool = require('../src/util/YBVerifyUtil');
global.ArrayUtil = require('../src/util/ArrayUtil');
global.ConstantUtil = require('../src/util/ConstantUtil');
global.DateTimeUtil = require('../src/util/DateTimeUtil');
global.StringUtil = require('../src/util/StringUtil');
global.YBEncryption = require('../src/util/YBEncryption');
// global.YBTokenVerify = require('../util/YBTokenVerify');
// global.YBRedisTool = require('../util/YBRedisTool');