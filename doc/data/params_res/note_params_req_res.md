
---



## params_req

/user/login
```json
{
  "user_name":"user_name",
  "password":"password"
}
```


/user/register
```json
{
  "user_name":"user_name",
  "password":"password",
  "repeat_password":"password"
}
```


/user/logout

/user/get_base_info

```json
{
  "access_token":"access_token",
  "user_id":"user_id"
}
```




/bill/get_list

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "search_key":"",
  "page_number":1,
  "page_size":10
}
```




/provider/get_list

/customer/get_list

/product/get_list

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "search_key":"",
  "page_number":1,
  "page_size":10
}
```

/product/batch/get_list

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "search_key":"",
  "page_number":1,
  "page_size":10,
  "product_id":"id"
}
```


/provider/add

/customer/add

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "name":"name",
  "remark":"remark",
  "telephone":"18964587666"
}
```

/product/add

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "name":"name",
  "remark":"remark"
}
```


/product/batch/add

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "name":"name",
  "remark":"remark",
  "product_id":"id"
}
```



/provider/detail

/customer/detail

/product/detail

/product/batch/detail

/bill/detail

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "id":"id"
}
```


/provider/update_detail

/customer/update_detail

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "name":"name",
  "remark":"remark",
  "id":"id",
  "telephone":"18964587666"
}
```

/product/update_detail

/product/batch/update_detail

```json
{
  "access_token":"access_token",
  "user_id":"user_id",
  "name":"name",
  "remark":"remark",
  "id":"id"
}
```



/bill/add

```json
{
  	"access_token":"access_token",
  	"user_id":"user_id",
	"type":"type",
	"remark":"remark",
	"transaction_amount":100,
	"provider":{
	"object_id":"object_id",
	"name":"name"
	},
	"customer":{
	"object_id":"object_id",
	"name":"name"
	},
	"products":[
	{
		"object_id_product":"object_id_product",
		"object_id_batch":"object_id_batch",
		"name_product":"name_product",
		"name_batch":"name_batch",
		"remark":"remark",
		"price":10,
		"count":10,
		"total_price":100
	}
	]

  
}
```



---

## params_res

### common_success common_error

/user/logout

/user/register


/provider/add

/customer/add

/product/add

/product/batch/add




/provider/update_detail

/customer/update_detail

/product/update_detail

/product/batch/update_detail


/provider/detail

/customer/detail

/product/detail

/product/batch/detail

/bill/detail


common_error.json

```json

{
  "code":1,
  "req_url":"common_error",
  "msg":"msg"
}
```

/user/logout

/user/register



/provider/update_detail

/customer/update_detail

/product/update_detail

/product/batch/update_detail





common_success.json

```json
{
  "code":0,
  "req_url":"common_success",
  "msg":"msg"
}
```




### other


#### success

/user/login


```json
{
  "code":0,
  "req_url":"/user/login",
  "msg":"",
  "data":{
    "access_token":"access_token",
    "user_id":"user_id"
  }
}
```





/user/get_base_info

```json
{
  "code":0,
  "req_url":"/user/get_base_info",
  "msg":"",
  "data":{
    "balance":0,
    "income":0,
    "pay":0
  }
}
```




/product/batch/get_list

/provider/get_list

/customer/get_list

/product/get_list

```json
{
  "code":0,
  "req_url":"/provider/get_list",
  "msg":"",
  "data":{
    "total_count":100,
    "data_list":[
    {
    "id":"id",
    "name":"name",
    "remark":"remark"
    }
    ]
  }
}
```


/bill/get_list

```json
{
  "code":0,
  "req_url":"/bill/get_list",
  "msg":"",
  "data":{
    "total_count":100,
    "data_list":[
    {
    "id":"id",
    "type":"type",
    "name":"name",
    "create_time":111111111,
    "transaction_amount":100
    }
    ]
  }
}
```



/provider/add

/customer/add

/product/add

/product/batch/add


```json
{
  "code":0,
  "req_url":"common_success_add",
  "msg":"msg",
  "data":{
  "id":"id"
  }
}
```





/provider/detail

/customer/detail



```json
{
  "code":0,
  "req_url":"/provider/detail",
  "msg":"",
  "data":{
    "id":"id",
    "name":"name",
    "remark":"remark",
    "telephone":"18964587666"
  }
}
```

/product/detail

/product/batch/detail

```json
{
  "code":0,
  "req_url":"/product/detail",
  "msg":"",
  "data":{
    "id":"id",
    "name":"name",
    "remark":"remark"
    
  }
}
```

/bill/detail

```json
{
  "code":0,
  "req_url":"/bill/detail",
  "msg":"",
  "data":{
    "id":"id",
    "type":"type",
    "remark":"remark",
    "order_number":"1111111111",
    "transaction_amount":100,
    "create_time":1111111111111,
    "provider":{
    "object_id":"object_id",
    "name":"name"
    },
	"customer":{
	"object_id":"object_id",
	"name":"name"
	},
	"products":[
	{
		"object_id_product":"object_id_product",
    	"object_id_batch":"object_id_batch",
    	"name_product":"name_product",
    	"name_batch":"name_batch",
    	"remark":"remark",
    	"price":10,
    	"count":10,
    	"total_price":100
	}
	]
    
  }
}
```

#### error




/product/batch/get_list

/provider/get_list

/customer/get_list

/product/get_list

```json
{
  "code":20001,
  "req_url":"/provider/get_list",
  "msg":"暂无更多数据"
}
```




