/**
 * Created by nick on 2018/1/27.
 */

import log4js from 'log4js';
import path from 'path';
var logDirectory = path.join(__dirname,'..', 'log')

log4js.configure({

    appenders: {
        server_log: { type: 'file', filename: path.join(logDirectory, 'server_log.log') } ,
        server_error: { type: 'file', filename: path.join(logDirectory, 'server_error.log') } ,
        access_log: {
            type: 'dateFile',
            filename: path.join(logDirectory,'access_log', 'access_log'),
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'access'
        } ,

        },
    categories: {
        access_log: { appenders: ['access_log'], level: 'INFO' } ,
        server_log: { appenders: ['server_log'], level: 'trace' } ,
        server_error: { appenders: ['server_error'], level: 'error' } ,
        default: { appenders: ['server_log'], level: 'trace' }
    }


    // appenders: [{
    //     type: 'DateFile',
    //     filename: 'access.log',
    //     pattern: '-yyyy-MM-dd.log',
    //     alwaysIncludePattern: true,
    //     category: 'access'
    // }],
    //
    // levels: {
    //      'log_file' : 'info'
    //  },
    //  appenders : [
    //      {
    //          type : 'console',
    //          category: "console"
    //      },
    //      {
    //          type : 'stdout'
    //      },
    //      {
    //          type : 'file',
    //          filename: __dirname + '/logs/test.log',//文件目录，当目录文件或文件夹不存在时，会自动创建
    //          maxLogSize : 10,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
    //          backups : 3,//default value = 5.当文件内容超过文件存储空间时，备份文件的数量
    //          //compress : true,//default false.是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
    //          encoding : 'utf-8',//default "utf-8"，文件的编码
    //          category : 'log_file'
    //     },
    //      {
    //          type: "dateFile",
    //          filename: __dirname + '/logs/dateFileTest',//您要写入日志文件的路径
    //          alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
    //          //compress : true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
    //          pattern: "-yyyy-MM-dd-hh.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
    //          encoding : 'utf-8',//default "utf-8"，文件的编码
    //          category:"log_date",
    //      }
    //  ],
    //  replaceConsole: true


});

const loggerInfo = log4js.getLogger('server_log');
const loggerError = log4js.getLogger('server_error');



var init = (app)=>{
    app.use(log4js.connectLogger(log4js.getLogger('access_log'), { level: log4js.levels.INFO }));
};


// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

function obj() {

    this.init = init;
    this.logger = loggerInfo;
    this.loggerError = loggerError;
}

export default new obj();