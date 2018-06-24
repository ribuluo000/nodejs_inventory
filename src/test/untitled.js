var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

console.log("!--------------------------------------------------------------------!");

process.on('exit', function(code) {

    // 以下代码永远不会执行
    setTimeout(function() {
        console.log("该代码不会执行");
    }, 0);

    console.log('退出码为:', code);
});
process.on('uncaughtException', function(code) {

    // 以下代码永远不会执行
    setTimeout(function() {
        console.log("该代码会执行");
    }, 0);

    console.log('uncaughtException:', code);
});
console.log("程序执行结束");


// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过参数读取
process.argv.forEach(function(val, index, array) {
    console.log(index + ': ' + val);
});

// 获取执行路径
console.log(process.execPath);


// 平台信息
console.log(process.platform);

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());

console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");

    console.log("准备写入文件");
    fs.writeFile('input.txt', '我是通过写入的文件内容！',  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
}
console.log("!--------------------------------------------------------------------!");
var fs = require("fs");

var data = fs.readFileSync(__dirname+'/test.js');

console.log(data.toString());
console.log("程序执行结束!");
console.log("!--------------------------------------------------------------------!");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    // console.log(data.toString());
    console.log("!readOk--------------------------------------------------------------------!");

});

console.log("程序执行结束!");
console.log("!--------------------------------------------------------------------!");


// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
    console.log('连接成功。');

    // 触发 data_received 事件
    eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
    console.log('数据接收成功。');
});

// 触发 connection 事件
eventEmitter.emit('connection');

console.log("程序执行完毕。");

console.log("!--------------------------------------------------------------------!");

//event.js 文件
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function() {
    console.log('some_event 事件触发');
});
setTimeout(function() {
    event.emit('some_event');
}, 1000);


console.log("!--------------------------------------------------------------------!");
//event.js 文件
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
console.log("!--------------------------------------------------------------------!");
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
    console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
    console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");
console.log("!--------------------------------------------------------------------!");
const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

const buf22 = Buffer.alloc(256);
len = buf22.write("www.runoob.com");

console.log("写入字节数 : "+  len);

let buff = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
    buff[i] = i + 97;
}

console.log( buff.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buff.toString('ascii',0,5));   // 输出: abcde
console.log( buff.toString('utf8',0,5));    // 输出: abcde
console.log( buff.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

console.log("!--------------------------------------------------------------------!");
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());


console.log("!--------------------------------------------------------------------!");
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
    console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}
console.log("!--------------------------------------------------------------------!");
var buf111 = Buffer.from('abcdefghijkl');
var buf211 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf211.copy(buf111, 2);

console.log(buf111.toString());
console.log("!--------------------------------------------------------------------!");
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
console.log("!--------------------------------------------------------------------!");
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
    data += chunk;
});

readerStream.on('end',function(){
    console.log(data);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

console.log("程序执行完毕");

var fs = require("fs");
var data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
    console.log(err.stack);
});

console.log("程序执行完毕");

var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);



console.log("程序执行完毕");

var readerStream = fs.createReadStream('/Users/nick/Downloads/0Nick/tmp/mouse.jpg');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.jpg');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);



console.log("程序执行完毕");
console.log("!--------------------------------------------------------------------!");

var hello = require('./hello');
hello.world();

//main.js
var Hello = require('./hello2');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();

var hello2 = new Hello();
hello2.setName('BYVoid22');
hello2.sayHello();
hello.sayHello();
console.log("!--------------------------------------------------------------------!");
function say(word) {
    console.log(word);
}

function execute(someFunction, value) {
    someFunction(value);
}

execute(say, "Hello");
console.log("!--------------------------------------------------------------------!");
function execute(someFunction, value) {
    someFunction(value+'2');//todo 统一作用域定义相同的方法，后者覆盖前者；
}

execute(function(word){ console.log(word) }, "Hello");
{
    function execute(someFunction, value) {
        someFunction(value);
    }

    execute(function(word){ console.log(word) }, "Hello");
}
console.log("!--------------------------------------------------------------------!");
let aaaa='let';
console.log(aaaa);
console.log("!--------------------------------------------------------------------!");
// 输出全局变量 __filename 的值
console.log( __filename );


console.log("!--------------------------------------------------------------------!");
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);


console.log("!--------------------------------------------------------------------!");
{
    var util = require('util');
    function Person() {
        this.name = 'byvoid';
        this.toString = function() {
            return this.name;
        };
    }
    var obj = new Person();
    console.log(util.inspect(obj));
    console.log(util.inspect(obj, true));
}
console.log("!--------------------------------------------------------------------!");
{
    var util = require('util');

    util.isArray([])
    // true
    util.isArray(new Array)
    // true
    util.isArray({})
    // false
}
{
    var util = require('util');

    util.isRegExp(/some regexp/)
    // true
    util.isRegExp(new RegExp('another regexp'))
    // true
    util.isRegExp({})
    // false
}
{
    var util = require('util');

    util.isDate(new Date())
    // true
    util.isDate(Date())
    // false (without 'new' returns a String)
    util.isDate({})
    // false
}
{
    var util = require('util');

    util.isError(new Error())
    // true
    util.isError(new TypeError())
    // true
    util.isError({ name: 'Error', message: 'an error occurred' })
    // false
}
console.log("!--------------------------------------------------------------------!");
{
    var os = require("os");

    // CPU 的字节序
    console.log('endianness : ' + os.endianness());

    // 操作系统名
    console.log('type : ' + os.type());

    // 操作系统名
    console.log('platform : ' + os.platform());

    // 系统内存总量
    console.log('total memory : ' + os.totalmem() + " bytes.");

    // 操作系统空闲内存量
    console.log('free memory : ' + os.freemem() + " bytes.");
}
console.log("!--------------------------------------------------------------------!");
{
    var path = require("path");

    // 格式化路径
    console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

    // 连接路径
    console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

    // 转换为绝对路径
    console.log('resolve : ' + path.resolve('main.js'));

    // 路径中文件的后缀名
    console.log('ext name : ' + path.extname('main.js'));
    console.log('path.basename : ' + path.basename('main.js'));
}
console.log("!--------------------------------------------------------------------!");
{
    var dns = require('dns');

    dns.lookup('www.github.com', function onLookup(err, address, family) {
        console.log('ip 地址:', address);
        dns.reverse(address, function (err, hostnames) {
            if (err) {
                console.log(err.stack);
            }

            console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
        });
    });
}
console.log("!--------------------------------------------------------------------!");

console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");

















console.log("!--------------------------------------------------------------------!");
// {
    var events = require('events');
    var eventEmitter = new events.EventEmitter();

    // 监听器 #1
    var listener1 = function listener1() {
        console.log('监听器 error 执行。');
    }

    // 绑定 connection 事件，处理函数为 listener1
    eventEmitter.addListener('error', listener1);
// }
console.log("!--------------------------------------------------------------------!");
{
    var EventEmitter = require("events").EventEmitter;
    var domain = require("domain");

    var emitter1 = new EventEmitter();

    // 创建域
    var domain1 = domain.create();

    domain1.on('error', function(err){
        console.log("domain1 处理这个错误 ("+err.message+")");
    });

    // 显式绑定
    domain1.add(emitter1);

    emitter1.on('error',function(err){
        console.log("监听器处理此错误 ("+err.message+")");
    });

    emitter1.emit('error',new Error('通过监听器来处理'));

    emitter1.removeAllListeners('error');

    emitter1.emit('error',new Error('通过 domain1 处理'));

    var domain2 = domain.create();

    domain2.on('error', function(err){
        console.log("domain2 处理这个错误 ("+err.message+")");
    });

    // 隐式绑定
    domain2.run(function(){
        var emitter2 = new EventEmitter();
        emitter2.emit('error',new Error('通过 domain2 处理'));
    });


    domain1.remove(emitter1);
    emitter1.emit('error', new Error('转换为异常，系统将崩溃!'));
}
console.log("!--------------------------------------------------------------------!");





