/**
 * Created by nick on 2018/6/20.
 */
import db from '../common/db';
const mongoose  = db.mongoose;
const mongoose_paginate  = db.mongoose_paginate;
const mongodb_conn1  = db.mongodb_conn1;
import {Decimal} from 'decimal.js';


const Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;

//用户

let schema = new Schema({

    user_name: {type:String,unique: true},	//用户名

    password: String,	//密码

    balance: { type: Schema.Types.Decimal128, default:new Decimal(0) },	//余额

    create_time: { type: Date, default: Date.now }	//创建时间

});


schema.index({ user_name: 1}); // schema level

schema.index({ balance: -1 , user_name: 1}); // schema level

schema.plugin(mongoose_paginate);
const User = mongodb_conn1.model('User', schema);

export default User;