
```
Node.js 


var mongoose = require('mongoose');

const Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;


//用户

var UserSchema = new Schema({

    	username: String,	//用户名

	password: String,	//密码

	balance: { type: Schema.Types.Decimal128, default: 0 }	//余额

	create_time: { type: Date, default: Date.now }	//创建时间

});


//供应商

var ProviderSchema = new Schema({

	object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id 

    	name: String,		//名称

	telephone: String,	//手机号

	remark: String,	//备注

	create_time: { type: Date, default: Date.now }	//创建时间

	

});


//客户

var CustomerSchema = new Schema({

	object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id 

    	name: String,		//名称

	telephone: String,	//手机号

	remark: String,	//备注

	create_time: { type: Date, default: Date.now }	//创建时间

	

});



//产品

var ProductSchema = new Schema({

	object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id 

    	name: String,		//名称

	remark: String,	//备注

	create_time: { type: Date, default: Date.now }	//创建时间

	

});


//批次

var BatchSchema = new Schema({

	object_id_product: [Schema.Types.ObjectId],	// 产品 object_id 

	object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id 

    	name: String,		//名称

	remark: String,	//备注

	create_time: { type: Date, default: Date.now }	//创建时间

	

});


//账单中包含的产品相关信息

var BillProductListItemSchema = new Schema({


	object_id_product:[Schema.Types.ObjectId],		// 产品

	object_id_batch:[Schema.Types.ObjectId],		// 批次

    	name_product: String,		//产品名称

	name_batch: String,		//批次名称

	price: { type: Schema.Types.Decimal128, default: 0 },		//产品单价

	count: { type: Schema.Types.Decimal128, default: 0 },		//产品数量

	total_price: { type: Schema.Types.Decimal128, default: 0 },		//产品总价单价

	remark: String	//备注	

});



//账单

var BillSchema = new Schema({

	


	products:[

	BillProductListItemSchema

	],// 订单相关产品列表

	customer:{

	object_id:[Schema.Types.ObjectId],

    	name: String,		//名称

	}, 	// 客户

	provider:{

	object_id:[Schema.Types.ObjectId],

    	name: String,		//名称

	}, 	// 供应商

	object_id_created_by: [Schema.Types.ObjectId],	//创建人 object_id 

	order_number: String,		//订单号

    	type: String,		//账单类型

	transaction_amount:{ type: Schema.Types.Decimal128, default: 0 } //交易金额

	remark: String,	//备注

	create_time: { type: Date, default: Date.now }	//创建时间

	

});


UserSchema.index({ username: 1}); // schema level

UserSchema.index({ balance: -1 , username: 1}); // schema level


ProviderSchema.index({ 

object_id_created_by: 1 , 

create_time: -1

}); // schema level



CustomerSchema.index({ 

object_id_created_by: 1 , 

create_time: -1

}); // schema level



ProductSchema.index({ 

object_id_created_by: 1 , 

create_time: -1

}); // schema level



BatchSchema.index({ 

object_id_product: 1 , 

object_id_created_by: 1 , 

create_time: -1

}); // schema level



BillSchema.index({ 

object_id_created_by: 1 , 

create_time: -1

}); // schema level



mongoose.model('User', UserSchema);

mongoose.model('Provider', ProviderSchema);

mongoose.model('Customer', CustomerSchema);

mongoose.model('Product', ProductSchema);

mongoose.model('Batch', BatchSchema);

mongoose.model('Bill', BillSchema);



```