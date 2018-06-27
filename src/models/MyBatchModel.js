/**
 * Created by nick on 2018/6/20.
 */
import db from '../common/db';
const mongoose  = db.mongoose;
const mongoose_paginate  = db.mongoose_paginate;
const mongodb_conn1  = db.mongodb_conn1;
const Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;


//批次

let schema = new Schema({

    object_id_product: Schema.Types.ObjectId,	// 产品 object_id

    object_id_created_by: Schema.Types.ObjectId,	//创建人 object_id

    name: {type:String,unique: true},		//名称

    remark: String,	//备注

    create_time: { type: Date, default: Date.now }	//创建时间



});




schema.index({

    object_id_product: 1 ,

    object_id_created_by: 1 ,

    create_time: -1

}); // schema level
schema.plugin(mongoose_paginate);

const Batch = mongodb_conn1.model('Batch', schema);

export default Batch;