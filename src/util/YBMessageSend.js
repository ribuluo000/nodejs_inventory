import request from 'request';
import urlencode from 'urlencode';
import _ from 'underscore';
import MyConfig from '../common/config';

import MyEncryptionUtil from './MyEncryptionUtil';
import request from 'request';
import request from 'request';
import request from 'request';
import request from 'request';

var md5 = MyEncryptionUtil.md5; //md5模块
// var JPush = require("../node_modules/jpush-sdk/lib/JPush/JPush.js");
// var client = JPush.buildClient(MyConfig.jpush_config.AppKey, MyConfig.jpush_config.MasterSecret);
var io = require('../controllers/YBSocket').io; //io
var chatio = require('../controllers/YBSocket').chat;
var redis = require('../common/db').redis;
var redis_db1 = require('../common/db').redis_db1;
var fs = require('fs');
const nodemailer = require('nodemailer');
var CompanyWXGetAccessToken = require('./CompanyWXGetAccessToken.js').CompanyWXGetAccessToken;
var ContactsModel = require('../models/YBContactsModel.js');
const smtp = MyConfig.email_config.smtp;
const moment = require('moment');
const YBSmsModel = require('../models/YBSmsModel');
const CompanyModel = require('../models/YBCompanyModel');
const YBSocketRecord = require('../models/YBNewsRecordsModel');
const SystemModel = require('../models/MySystemModel');
let async = require('async');
// var YBSocket = require('../controllers/YBSocket');


/**
 * 消息推送
 * 推送对象@param target  给所有人推还是个人   all所有人/group一组人/one一个人
 * 推送内容@param content
 * 推送ID@param to  单人：user_id   组：组名  例如 service   前端传来   全部：to
 * 参数: target（one 一个人 / all 所有人 / group 分组）
 * data参数说明:Json格式:
 *         {
 *           require_true:{                             require_true对象为必传对象
 *               socket_way:'one',                      推送方式 （one 一个人 / all 所有人 / group 分组）
 *               socket_message:'2222222222',              推送内容
 *               to_ids:['92472ca0-e3a0-11e7-b718-af6c16921e9c','92470590-e3a0-11e7-b718-af6c16921e9c'],   推送人员id 取user_id,可以单个string类型，也可以多个Array类型
 *               company_id:'本次测试',          公司id
 *               type_value:'1',               推送类型值  /1 服务单相关/ 2 新员工申请/ 3 新服务商申请 / 4 系统消息提醒 /5 微信消息提醒
 *               type_name:'服务单相关'              推送类型名称
 *           },
 *           defined:{                         defined对象为自定义保存内容字段 (非必传)
 *               order_number:'20171225150028752443',
 *               is_trouble_order:'-1'
 *           }
 *        }
 * 默认不保存：传入true保存
 */
exports.socket_send = function (data, is_need_safe = false) {

    //字段验证
    if (typeof data == "string") data = JSON.parse(data);
    if (!data.require_true) return '缺少必传参数:require_true';
    if (!data.require_true.socket_way) return '缺少必传参数:socket_way';
    if (!data.require_true.socket_message) return '缺少必传参数:socket_message';
    if (!data.require_true.to_ids) return '缺少必传参数:to_ids';
    if (!data.require_true.company_id) return '缺少必传参数:company_id';
    if (!data.require_true.type_value) return '缺少必传参数:type_value';
    if (!data.require_true.type_name) return '缺少必传参数:type_name';


    //业务逻辑
    let target = data.require_true.socket_way;
    let content = data.require_true.socket_message;
    let to = data.require_true.to_ids;
    switch (target) {
        case 'all':
            io.sockets.emit('chat', content);
            break;
        case 'group':
            io.sockets.in(to).emit('chat', content);
            break;
        case 'one':
            if (to.constructor == String) {
                redis.hget('socket_info', to, function (error, res) {
                    if (res) {
                        //io.sockets.sockets  连接当前服务器的所有socket列表，存储于对象中
                        var tosocket = _.findWhere(io.sockets.sockets, {id: res});
                        if (tosocket) {
                            tosocket.emit('chat', content);
                        } else {
                            return -1;
                        }
                    }
                })
            }
            if (to.constructor == Array) {
                for (var i = 0; i < to.length; i++) {
                    redis.hget('socket_info', to[i], function (error, res) {
                        if (res) {
                            var tosocket = _.findWhere(io.sockets.sockets, {id: res});
                            if (tosocket) {
                                tosocket.emit('chat', content);
                            }
                        }
                    });
                }
            }
            break;
    }
    //记录消息推送
    if (is_need_safe == true) {
        (function (data) {
            let record = [];
            let msg = data.require_true.socket_message;
            if (typeof data.require_true.socket_message == "object") {
                msg = data.require_true.socket_message.msg;
            }
            if (data.require_true.to_ids.constructor == Array) {
                for (let item of data.require_true.to_ids) {
                    record.push({
                        news_id: uuid.v1(), // 消息id
                        company_id: data.require_true.company_id,//公司id
                        user_id: item, // 用户id
                        create_time: new Date().getTime(),
                        news_content: msg, // 消息内容
                        news_type: { // 1 服务单相关/ 2 新员工申请/ 3 新服务商申请 / 4 系统消息提醒
                            type_value: data.require_true.type_value,
                            type_name: data.require_true.type_name,
                        },
                        news_data: data.defined || {}  //存储推送相关内容
                    })
                }
            } else {
                record.push({
                    news_id: uuid.v1(), // 消息id
                    company_id: data.require_true.company_id,//公司id
                    user_id: data.require_true.to_ids, // 用户id
                    create_time: new Date().getTime(),
                    news_content: msg, // 消息内容
                    news_type: { // 1 服务单相关/ 2 新员工申请/ 3 新服务商申请 / 4 系统消息提醒
                        type_value: data.require_true.type_value,
                        type_name: data.require_true.type_name,
                    },
                    news_data: data.defined || {}   //存储推送相关内容
                })
            }
            YBSocketRecord.create(record, (err, result) => {
            })
        })(data);
    }

    console.log('socket send is successed');
    return 'socket send is successed'
};


/**消息推送
 * 推送对象@param target  给所有人推还是个人   all所有人/group一组人/one一个人
 * 推送内容@param content
 * 推送ID@param to  单人：user_id   组：组名  例如 service   前端传来   全部：to
 * @param callback
 */
//参数: target（one 一个人 / all 所有人 / group 分组）
exports.wechatSocket_send = function (target, content, to, callback) {
    //群聊
    if (target == 'all') {
        io.sockets.emit('chat', content);
        if (callback) {
            callback(null, '群推成功');
        }
    }
    // 分组推送
    else if (target == 'group') {
        io.sockets.in(to).emit('chat', content);
        if (callback) {
            callback(null, '推送到组' + to + '成功');
        }
    } else if (target == 'one') {
        //私聊
        // get
        if (to.constructor == String) {
            redis.hget('socket_info', to, function (error, res) {
                if (error) {
                    if (callback) {
                        callback(error);
                    }
                } else if (!res) {
                    if (callback) {
                        callback(null, '消息推送失败');
                    } else {
                        return -1;
                    }
                } else if (res) {
                    //io.sockets.sockets  连接当前服务器的所有socket列表，存储于对象中
                    var tosocket = _.findWhere(io.sockets.sockets, {id: res});
                    if (tosocket) {
                        tosocket.emit('chat', content);
                    } else {
                        return -1;
                    }
                    if (callback) {
                        callback(null, '推送成功');
                    }
                }
            });
        } else if (to.constructor == Array) {
            for (var i = 0; i < to.length; i++) {
                redis.hget('socket_info', to[i], function (error, res) {
                    if (error) {
                        if (callback) {
                            callback(error);
                        }
                    } else if (res) {
                        var tosocket = _.findWhere(io.sockets.sockets, {id: res});
                        if (tosocket) {
                            tosocket.emit('chat', content);
                        } else {
                            return -1;
                        }
                        if (callback) {
                            callback(null, '推送成功');
                        }
                    }
                });
            }
        }

    }
}


exports.ChatSocket_send = function (target, content, to, callback) {
    //群聊
    if (target == 'all') {
        chatio.emit('chat', content);
        if (callback) {
            callback(null, '群推成功');
        }
    }
    // 分组推送
    else if (target == 'group') {
        chatio.in(to).emit('chat', content);
        if (callback) {
            callback(null, '推送到组' + to + '成功');
        }
    } else if (target == 'one') {
        //私聊
        // get
        if (to.constructor == String) {
            redis.hget('chatsocket_info', to, function (error, res) {
                if (error) {
                    if (callback) {
                        callback(error);
                    }
                } else if (!res) {
                    if (callback) {
                        callback('消息推送失败', null);
                    } else {
                        return -1;
                    }
                } else if (res) {
                    //io.sockets.sockets  连接当前服务器的所有socket列表，存储于对象中
                    var tosocket = _.findWhere(chatio.sockets, {id: res});
                    if (tosocket) {
                        tosocket.emit('chat', content);
                        if (callback) {
                            callback(null, '推送成功');
                        } else {
                            return -1;
                        }
                    } else {
                        if (callback) {
                            callback('socket_id不存在', null)
                        } else {
                            return -1;
                        }
                    }
                }
            });
        } else if (to.constructor == Array) {
            for (var i = 0; i < to.length; i++) {
                redis.hget('chatsocket_info', to[i], function (error, res) {
                    if (error) {
                        if (callback) {
                            callback(error);
                        }
                    } else if (res) {
                        var tosocket = _.findWhere(chatio.sockets, {id: res});
                        if (tosocket) {
                            tosocket.emit('chat', content);
                            if (callback) {
                                callback(null, '推送成功');
                            } else {
                                return -1
                            }
                        } else {
                            if (callback) {
                                callback('socket_id不存在', null)
                            } else {
                                return -1;
                            }
                        }

                    }
                });
            }
        }

    }
}


class Sms {

    constructor(company_id, sms_content, sms_telephone) {
        this.company_id = company_id;
        this.sms_content = sms_content;
        this.sms_telephone = sms_telephone;
        this.sms_send_time = new Date().getTime();
    }

    sms_send() {
        // 设置基本信息
        let data = {
            company_id: this.company_id,
            sms_content: this.sms_content,
            sms_telephone: this.sms_telephone,
            sms_send_time: this.sms_send_time,
            sms_code: 1
        };
        let account = MyConfig.message_account.user_name;
        let passcode = MyConfig.message_account.password;
        let token = MyConfig.message_account.token;
        let random = parseInt(('' + Math.random()).match(/[1-9]\d{5}/)[0]); //长度为6的随机数
        let timestamp = this.sms_send_time;
        //请求参数体
        let ctx = {
            account: account,
            passcode: passcode,
            smsData: [{
                phone: this.sms_telephone,
                msgTxt: this.sms_content,
                createTime: timestamp,
                validSecond: MyConfig.message_account.validSecond
            }]
        };
        // 加密的key
        let key = md5(token + timestamp + random + JSON.stringify(ctx)); //加密key
        // urlencode后的ctx
        let ctx_urlencode = urlencode(JSON.stringify(ctx));
        // 请求地址
        let target = 'http://cw.api.mwee.cn/BookingSmsBus/sms/sms/' + account + '/' + key + '/' + timestamp + '/' + random + '?ctx=' + ctx_urlencode;

        request.post(target, function (error, response, body) {
            if (error) {
                redis.hset("MessageError", data.company_id, JSON.stringify(data))
                data.sms_code = 0;
                YBSmsModel.create(data, (err, result) => {
                    if (err) {
                        redis.hset("MessageMissing", data.company_id, JSON.stringify(data))
                    } else {
                        console.log('sms send message is error');
                    }
                })
            } else {
                if (data.company_id) {
                    CompanyModel.findOne({company_id: data.company_id, 'oss.apply_state.state_value': '3'}, {
                        _id: 1,
                        'session.base_info.company_name': 1,
                        'oss.apply_state.state_value': 1
                    }, (err, result) => {
                        if (err) {
                            redis.hset("MessageMissing", data.company_id, JSON.stringify(data))
                        } else {
                            if (!result) {
                                console.log(`it's free trial`);
                            } else {
                                data.company_name = result.session.base_info.company_name;
                                data.company_info = result._id;
                                YBSmsModel.create(data, (err, result) => {
                                    if (err) {
                                        redis.hset("MessageMissing", data.company_id, JSON.stringify(data))
                                    } else {
                                        console.log('sms send message is ok');
                                    }
                                })
                            }
                        }
                    })
                } else {
                    console.log('it do not has company_id')
                }
            }
        })
    }

}

exports.sms_send = function (sms_telephone, sms_content, company_id) {
    let CID = company_id || '10000';
    async.auto({
        findOwingMoney: callback => {
            SystemModel.findOne({}, {
                'oss_systems.owing_money': 1,
            }, (error, response) => {
                callback(error, response);
            });
        },
        findCompanyInfo: callback => {
            CompanyModel.findOne({
                'company_id': CID
            }, {
                'oss.account_balance': 1,
            }, (error, response) => {
                callback(error, response);
            })
        }
    }, (error, result) => {
        if (error) {
            YBConsoleLog('fail to send');
            return;
        }

        let account_balance = result.findCompanyInfo.oss.account_balance; //账户余额
        let owing_money = result.findOwingMoney.oss_systems.owing_money; //欠费额度

        if (account_balance >= owing_money) {
            new Sms(CID, sms_content, sms_telephone).sms_send()
        } else {
            YBConsoleLog('sms is arrearage'); // 已欠费 停止发送短信
        }
    })
};


/***
 *
 * jpush

//way ： 以什么样的方式推送（all；registration_id；alias；tag）
//name ： registration_id的值 或 alias的值 或tag的值 ，如果way的值是all，则此参数可以省略
//类似于socket_send参数
exports.app_push = function (data, is_need_safe = false) {
    //content,way,target
    //字段验证
    if (typeof data == "string") data = JSON.parse(data);
    if (!data.require_true) return '缺少必传参数:require_true';
    if (!data.require_true.socket_way) return '缺少必传参数:socket_way';
    if (!data.require_true.socket_message) return '缺少必传参数:socket_message';
    if (!data.require_true.to_ids) return '缺少必传参数:to_ids';
    if (!data.require_true.company_id) return '缺少必传参数:company_id';
    if (!data.require_true.type_value) return '缺少必传参数:type_value';
    if (!data.require_true.type_name) return '缺少必传参数:type_name';
    if (!data.require_true.registration_id) return '缺少必传参数:registration_id';

    //业务逻辑
    let content = data.require_true.socket_message;
    let way = data.require_true.socket_way;
    let target = data.require_true.registration_id;
    switch (way) {
        case 'all':
            client.push().setPlatform(JPush.ALL) //设置所有平台
                .setAudience(JPush.ALL) //设置受众
                .setNotification(content) //设置通用通知
                .setMessage(content) //自定义消息
                .send(function (err, response) { // 发送
                    if (err) {
                        console.log(err);
                    }
                });
            break;
        case 'registration_id':
            client.push().setPlatform(JPush.ALL) //设置所有平台
                .setAudience(JPush.registration_id(target)) //设置受众
                //.setNotification(content) //设置通用通知
                .setNotification(content, JPush.ios(content, 'tishiyin.mp3'), JPush.android(content))
                //.setMessage(content) //自定义消息
                .setOptions(null, 60)
                .send(function (err, response) { // 发送
                    if (err) {
                        console.log(err);

                    }
                });
            break;
        case 'alias':
            client.push().setPlatform(JPush.ALL) //设置所有平台
                .setAudience(JPush.alias(target)) //设置受众
                .setNotification(content) //设置通用通知
                .setMessage(content) //自定义消息
                .send(function (err, response) { // 发送
                    if (err) {
                        console.log(err);
                    }
                });
            break;
        case 'tag':
            client.push().setPlatform(JPush.ALL) //设置所有平台
                .setAudience(JPush.tag(target)) //设置受众
                .setNotification(content) //设置通用通知
                .setMessage(content) //自定义消息
                .send(function (err, response) { // 发送
                    if (err) {
                        console.log(err);
                    }
                });
            break
    }
    //记录消息推送
    if (is_need_safe == true) {
        (function (data) {
            let record = [];
            if (data.require_true.to_ids.constructor == Array) {
                for (let item of data.require_true.to_ids) {
                    record.push({
                        news_id: uuid.v1(), // 消息id
                        company_id: data.require_true.company_id,//公司id
                        user_id: item, // 用户id
                        create_time: new Date().getTime(),
                        news_content: data.require_true.socket_message, // 消息内容
                        news_type: { // 1 服务单相关/ 2 新员工申请/ 3 新服务商申请 / 4 系统消息提醒
                            type_value: data.require_true.type_value,
                            type_name: data.require_true.type_name,
                        },
                        news_data: data.defined || {}  //存储推送相关内容
                    })
                }
            } else {
                record.push({
                    news_id: uuid.v1(), // 消息id
                    company_id: data.require_true.company_id,//公司id
                    user_id: data.require_true.to_ids, // 用户id
                    create_time: new Date().getTime(),
                    news_content: data.require_true.socket_message, // 消息内容
                    news_type: { // 1 服务单相关/ 2 新员工申请/ 3 新服务商申请 / 4 系统消息提醒
                        type_value: data.require_true.type_value,
                        type_name: data.require_true.type_name,
                    },
                    news_data: data.defined || {}   //存储推送相关内容
                })
            }
            YBSocketRecord.create(record, (err, result) => {
            })
        })(data);
    }

    console.log('app push has successed')
    return 'app push has successed'

}
 */
//发送验证码
exports.captcha_send = function (phone, callback) {
    //产生验证码
    var captcha = parseInt(('' + Math.random()).match(/[1-9]\d{5}/)[0]); //长度为6的随机数
    //将手机号和验证码以k:v形势存储在redis_db1中，并设置过期时间
    redis_db1.set(phone, captcha, function (err, ret) {
        if (err) {
            callback(err);
        }
        if (ret) {
            redis_db1.expire(phone, parseInt(300)); //设置过期时间300秒
            //发送验证码短信
            var content = '您的验证码是：' + captcha;
            //2.3.2更改  闪闪
            // new Sms().sms_send(phone, content, (err, result) => {
            //     callback(null, '验证码发送成功');
            // });
            this.sms_send(phone, content, (err, result) => {
                callback(null, '验证码发送成功');
            });

        }
    });
};

//验证验证码
exports.captcha_check = function (phone, captcha, callback) {
    redis_db1.get(phone, function (err, ret) {
        if (err) {
            callback(err);
        } else if (ret) {
            if (ret == captcha) {
                callback(null, '验证成功');
            } else {
                callback('短信验证码错误', null);
            }
        } else if (!ret) {
            callback('短信验证码错误', null);
        }
    });
}


exports.mail_send = function (company_name, callback) {
    let smtp = MyConfig.email_config.smtp;
    let sender = MyConfig.email_config.send_to.user;
    let transporter = nodemailer.createTransport(smtp);
    let mailOptions = {
        from: 'Yoopard<yoopard@mail.yoopard.cn>', // sender address mailfrom must be same with the user
        to: sender, // list of receivers
        subject: '你有一个新的客户', // Subject line
        text: 'Yoopard', // plaintext body
        html: `<b>你有一个新的客户:${company_name} 在 ${moment().format('MMMM Do YYYY, h:mm:ss a')} 时申请试用,请及时处理 https://bolt.yoopard.com/#/</b><img src="cid:01" style="width:200px;height:auto">`, // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};


exports.wechat_send = function (company_id, contact_id, content, callback) {
    if (typeof(callback) !== 'function') {
        var callback = function (error, response) {
            return;
        }

    }
    CompanyWXGetAccessToken(company_id, function (error, response) {
        if (error) {
            callback(error, null)
        } else {
            var accesstoken = response.accesstoken.value;

            ContactsModel.findOne({'contact_id': contact_id}, function (error, response) {
                if (error) {
                    callback(error, null)
                } else if (!response) {
                    callback({error_msg: '联系人不存在', code: '80003'}, null)
                } else {
                    var wxSendInfo = response.session.wx_send_info;
                    var str = '';
                    for (value of wxSendInfo) {
                        if (value.company_id == company_id) {
                            var openId = value.open_id;
                            //回复文本消息内容
                            var json = {
                                "touser": openId,
                                "text": {
                                    "content": content
                                },
                                "msgtype": "text"
                            };

                            let options = {
                                url: 'https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=' + accesstoken,
                                form: JSON.stringify(json),
                                headers: {
                                    "Content-Type": 'application/x-www-form-urlencoded'
                                }
                            };

                            request.post(options, function (error, response, body) {
                                callback(error, JSON.parse(body))
                            })
                        } else {
                            str += '0'
                        }
                    }
                    if (str.length == wxSendInfo.length) {
                        callback({error_msg: '微信号未与该公司绑定', code: '80004'}, null)
                    }

                }
            })

        }
    })


};

/**
 * 国际版邮箱验证
 * 负责:闪闪
 * @param user_email  注册邮箱
 * @param callback
 */
exports.international_mail_send = function (user_email, callback) {
    let smtp = MyConfig.email_config.smtp;
    let email_captcha = parseInt(('' + Math.random()).match(/[1-9]\d{5}/)[0]); //长度为6的随机数

    //将邮箱和验证码以k:v形势存储在redis_db1中，并设置过期时间
    redis_db1.set(user_email, email_captcha, function (err, result) {
        if (err) {
            callback(err);
        }
        if (result) {
            redis_db1.expire(user_email, parseInt(300)); //设置过期时间300秒
        }
    });
    //redis_db1.get(user_email, function (err, result) {console.log(result+'555')});
    //let sender=MyConfig.email_config.send_to.user;
    let transporter = nodemailer.createTransport(smtp);
    let mailOptions = {
        from: 'Yoopard<yoopard@mail.yoopard.cn>', // sender address mailfrom must be same with the user
        to: user_email, // list of receivers
        subject: 'Register Captcha', // Subject line
        text: 'Yoopard', // plaintext body
        html: `<b>Your email register captcha is:${email_captcha},please input in 5 minutes,thanks.</b>`, // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error);
        }
        //console.log('Message sent: ' + info.response);
        callback(null, info);
    });
};

//验证邮箱验证码
exports.email_captcha_check = function (user_email, email_captcha, callback) {
    redis_db1.get(user_email, function (err, result) {
        if (err) {
            callback(err);
        } else if (result) {
            if (result == email_captcha) {
                callback(null, 'verify success');
            } else {
                callback('The captcha you entered is incorrect', null);
            }
        } else if (!result) {
            callback('The captcha you entered is incorrect', null);
        }
    });
};

