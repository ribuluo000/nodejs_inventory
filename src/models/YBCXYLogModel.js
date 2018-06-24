/**
 */
module.exports = (function ImSchema() {
    var mongoose = require('../common/db').mongoose;
    var conn1 = require('../common/db').conn1;
    var shema = {
        system_name: { type: String, required: false },  //闪电豹
        http_type:{type: String, required: false},
        http_code:{type: Number, required: false},
        api_name:{type: String, required: false},
        data:{type: Object, required: false},   //传输数据
        response_time:{type: Number, required: false}, //响应时间
        day:{type: Number, required: false}
    };
    var collectionName = 'CXYLog';
    var CXYLogSchema = mongoose.Schema(shema);
    var CXYLog = conn1.model(collectionName, CXYLogSchema);
    return CXYLog;
})();