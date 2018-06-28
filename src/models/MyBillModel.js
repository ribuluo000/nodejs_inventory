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



//账单中包含的产品相关信息

var BillProductListItemSchema = new Schema({


    object_id_product:Schema.Types.ObjectId,		// 产品

    object_id_batch:Schema.Types.ObjectId,		// 批次

    name_product: String,		//产品名称

    name_batch: String,		//批次名称

    price: { type: Schema.Types.Decimal128, default: new Decimal(0) },		//产品单价

    count: { type: Schema.Types.Decimal128, default: new Decimal(0) },		//产品数量

    total_price: { type: Schema.Types.Decimal128, default: new Decimal(0) },		//产品总价单价

    remark: String	//备注

});




//账单

var schema = new Schema({




    products:[

        BillProductListItemSchema

    ],// 订单相关产品列表

    customer:{

        object_id:Schema.Types.ObjectId,

        name: String,		//名称

    }, 	// 客户

    provider:{

        object_id:Schema.Types.ObjectId,

        name: String,		//名称

    }, 	// 供应商

    object_id_created_by: Schema.Types.ObjectId,	//创建人 object_id

    order_number: {type:String,unique: true},		//订单号

    type: String,		//账单类型  1-付钱，2-收钱

    transaction_amount:{ type: Schema.Types.Decimal128, default: new Decimal(0) }, //交易金额

    remark: String,	//备注

    create_time: { type: Date, default: Date.now }	//创建时间



});




schema.index({

    object_id_created_by: 1 ,

    create_time: -1

}); // schema level
schema.plugin(mongoose_paginate);

const Bill = mongodb_conn1.model('Bill', schema);

export default Bill;