/**
 * Created by nick on 2018/1/27.
 */
import YBSystemModel from '../models/MySystemModel';
import FileStreamRotator from 'file-stream-rotator';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
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
                let data={
                    system_name: 'system_name',
                    http_type:tokens.method(req, res),
                    http_code:tokens.status(req, res),
                    data:req.body,   //传输数据
                    response_time:tokens['response-time'](req, res), //响应时间
                    day:new Date().getTime(),
                };
                YBSystemModel.create(data);
                return [
                    tokens.method(req, res)+' /',
                    ': '+JSON.stringify(req.body),
                    'Code:'+tokens.status(req, res),
                    'response-time:'+tokens['response-time'](req, res)+'ms'
                ].join(' ')
            }
        }, {stream: accessLogStreamShort}));

    }
}

export default new MyAccessLogUtil();