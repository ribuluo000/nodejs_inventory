
import db from '../common/db';
const mongoose  = db.mongoose;
const mongodb_conn1  = db.mongodb_conn1;

const Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;

let CXYLogSchema = new Schema({
    system_name: { type: String, required: false },  //
    http_type:{type: String, required: false},
    http_code:{type: Number, required: false},
    api_name:{type: String, required: false},
    data:{type: Object, required: false},   //传输数据
    response_time:{type: Number, required: false}, //响应时间
    day:{type: Number, required: false}
});


const CXYLog = mongodb_conn1.model('CXYLog', CXYLogSchema);

export default CXYLog;