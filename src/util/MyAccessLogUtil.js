/**
 * Created by nick on 2018/1/27.
 */
import YBSystemModel from '../models/MySystemModel';
import FileStreamRotator from 'file-stream-rotator';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import MyDateTimeUtil from './MyDateTimeUtil';
class MyAccessLogUtil{
    init(app){

        var logDirectory = path.join(__dirname,'..', 'log')

        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

        // create a rotating write stream
        var accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: path.join(logDirectory,'access_log', 'access-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        })

        var accessLogStreamShort = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: path.join(logDirectory,'access_log_short', 'access-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        })

        // setup the logger
        app.use(morgan('combined', {stream: accessLogStream}));
        app.use(morgan(function (tokens, req, res) {
            if(tokens.status(req, res)>=400 || tokens['response-time'](req, res)>1000){
                let req_data = req.url+'-'+'-'+JSON.stringify(req.query)+'-';
                let cur_time = MyDateTimeUtil.format2YYYY_MM_DD__HH_mm_ss(MyDateTimeUtil.nowTime());
                let http_type = tokens.method(req, res);
                let http_code = tokens.status(req, res);
                let response_time = tokens['response-time'](req, res);
                let data={
                    system_name: 'system_name',
                    http_type:http_type,
                    http_code:http_code,
                    data:req_data,   //传输数据
                    response_time:response_time, //响应时间
                    day:cur_time,
                };
                YBSystemModel.create(data);
                return [
                    'day: '+cur_time,
                    http_type,
                    'Code:'+http_code,
                    'response-time:'+response_time,
                    'query: '+req_data,
                ].join(' ')
            }
        }, {stream: accessLogStreamShort}));

    }
}

export default new MyAccessLogUtil();