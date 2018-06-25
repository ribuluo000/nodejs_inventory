/**
 * Created by nick on 2018/6/20.
 */
import db from '../common/db';
const mongoose  = db.mongoose;
const mongodb_conn1  = db.mongodb_conn1;

const Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;

//供应商

var ProviderSchema = new Schema({

    object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id

    name: String,		//名称

    telephone: String,	//手机号

    remark: String,	//备注

    create_time: { type: Date, default: Date.now }	//创建时间



});


ProviderSchema.index({

    object_id_created_by: 1 ,

    create_time: -1

}); // schema level

const Provider = mongodb_conn1.model('Provider', ProviderSchema);

export default Provider;