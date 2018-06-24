/**
 * Created by nick on 2018/1/26.
 */
var async = require('async');
var util = require('util')



//将一个Array中的元素，按照一定的规则转换，得到一个新的数组（元素个数不变)
var Arr=[1,2,3,4,5];
async.map(Arr,function(item,callback){
    var _setValue = parseInt(item)+1;
    callback(null,_setValue);
},function(err,results){

    console.log("map:"+results);
});

//和map一样，但是同步执行
async.mapSeries(Arr,function(item,callback){

    callback(null,parseInt(item)-1);
},function(err,results){

    console.log("mapSeries:"+results);
});


//map限制并发个数
async.mapLimit(Arr,2,function(item,callback){

    callback(null,parseInt(item)*10);
},function(err,results){
    console.log("mapLimit:"+results);
});




//Array的迭代器方法
var newArray=[];
async.each(Arr,function(item,callack){
    var _setValue = parseInt(item)*2;
    newArray.push(_setValue);
    callack(null);
},function(err){
    console.log("each:"+newArray);

});



//和each基本一样，但是顺序执行，API接口和参数都一样
newArray=[];
async.eachSeries(Arr,function(item,callback){

    newArray.push(parseInt(item)+3);

    callback(null);
},function(err){
    console.log("eachSeries:"+newArray);
});






//也和each差不多，多出来的limit参数，是限制允许并发执行的任务数
newArray=[];
async.eachLimit(Arr,2,function(item,callback){

    newArray.push(parseInt(item)*10);
    callback(null);

},function(err){

    console.log("eachLimit:"+newArray);
});




//过滤器
async.filter(Arr,function(item,callback){

    callback(parseInt(item)>3);
},function(results){
    console.log("filter:"+results);
});

//同步的过滤器
async.filterSeries(Arr,function(item,callback){

    callback(parseInt(item)>2);
},function(results){
    console.log("filterSeries:"+results);
});


//和filter相同，但是取补
async.reject(Arr,function(item,callback){

    callback(parseInt(item)>2);
},function(results){
    console.log("reject:"+results);
});

//reject的同步方法
async.rejectSeries(Arr,function(item,callback){

    callback(parseInt(item)>3);
},function(results){
    console.log("rejectSeries:"+results);
});


//将一个数组中的元素，归并成一个元素
async.reduce(Arr, 0, function(memo, item, callback){

    callback(null, memo + item)

}, function(err, result){

    if(err){
        console.error("error: " + err);
        return;
    }

    console.log("reduce:"+result);//
});



//对数组中的元素进行迭代操作，形成一个新数组
async.concat(Arr, function(item, callback){

    callback(null, [item+1, item+2]);

}, function(err, results){

    console.log("concat:"+results);//

});




//同名函数all。跟some相反，如果数组中所有元素都满足条件，则返回true，否则返回false
async.every(Arr, function(item, callback){

    callback(item > 3);

}, function(result){

    console.log("every:"+result);// false

});



//同名函数any。在数组中找至少一个元素，类似于filter和detect。区别在于，filter和detect是返回找到的元素，而some是返回bool
async.some(Arr, function(item, callback){

    callback(item > 10);

}, function(result){

    console.log("some:"+result);// false

});





//数组元素排序
var person1 = {"name": "aaa", age:79};
var person2 = {"name": "bbb", age:23};
var person3 = {"name": "ccc", age:54};

async.sortBy([person1, person2, person3], function(person, callback){

    callback(null, person.age);

}, function(err, sorted){

    for(var index in sorted){
        console.log("sortBy:"+sorted[index].age);
    }
    console.log('sorted:'+sorted);

});

async.sortBy([person1, person2, person3], function(person, callback){

    callback(null, -person.age);

}, function(err, sorted){

    for(var index in sorted){
        console.log("sortBy:"+sorted[index].age);
    }
    console.log('sorted:'+sorted);

});


//瀑布 执行方法，后面依赖前面的,
//waterfall和series函数有很多相似之处，都是按照顺序执行。
//不同之处是waterfall每个函数产生的值，都将传给下一个函数，而series则没有这个功能
async.waterfall([
    function(callback){
        callback(null, 1, 2);
    },
    function(arg1, arg2, callback){
        callback(null, arg1+arg2+3);
    },
    function(arg1, callback){
        callback(null,arg1+4);
    }
], function (err, result) {
    console.log("waterfall:"+result);
});



//series函数 串行执行
//它的作用就是按照顺序一次执行
async.series({
    one: function(callback){
        callback(null, 1);
    },
    two: function(callback){
        callback(null, 2);
    }
},function(err, results) {
    console.log("series:"+util.inspect(results));
});



//parallel函数是并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。
//传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序
async.parallel([
        function (callback) {
            callback(null, 'one');
        },
        function (callback) {
            callback(null, 'two');
        }
    ],
    function (err, results) {
        console.log("parallel:"+util.inspect(results));


    });




//parallelLimit函数和parallel类似，但是它多了一个参数limit。
//limit参数限制任务只能同时并发一定数量，而不是无限制并发
async.parallelLimit([
        function(callback){
            callback(null, 'one');
        },
        function(callback){
            callback(null, 'two');
        }
    ],
    2,
    function(err, results){
        console.log("parallelLimit:"+util.inspect(results));
    });




//自动依赖 todo im
async.auto({
    func1: function (callback, results) {
        callback(null, "abc", "bbc");
    },

    func2: function (callback, results) {
        console.log("Print#1:\n" + util.inspect(results));
        callback(null, { "puncha": "during" });
    },
    func3: ["func2", function ( results,callback) {
        console.log("Print#2:\n" + util.inspect(results));
        callback(null, 3);
    }],
    func4: ["func1", "func3", function (results,callback) {
        console.log("Print#3:\n" + util.inspect(results));
        callback(null);
    }]
},(err , results)=>{
    console.log('end'+util.inspect(results));


});


async.auto({
    func1: function (callback, results) {
        callback(null, "1", "2");
    },

    func2: function (callback, results) {
        console.log("func2:\n" + util.inspect(results));
        callback(null, { "name": "zjw" });
    },
    func3: ["func2", function (results,callback) {

        console.log("func3\n");
        console.log(results.func2);
        console.log(util.inspect(results));
        callback(null, 3);
    }],
    func4: ["func1", "func3", function (results,callback) {

        console.log("func4:\n");
        console.log(results.func1);
        console.log(results.func3);
        console.log(util.inspect(results));
        callback(null);
    }]
},(err , results)=>{
    console.log('end'+util.inspect(results));


});
