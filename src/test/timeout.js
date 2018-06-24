/**
 * Created by nick on 2018/1/17.
 */
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
var fs = require("fs");

// 异步读取
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");
console.log("!--------------------------------------------------------------------!");
function printHello(){
    console.log( "Hello, World!setTimeout2000");
}
// 两秒后执行以上函数
setTimeout(printHello, 2000);
console.log("!--------------------------------------------------------------------!");

// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);
// 两秒后执行以上函数
let ts = setInterval(printHello, 2000);

var tt = setTimeout(()=>{
    clearInterval(ts);
}, 3000);

console.log("!--------------------------------------------------------------------!");
console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
//
{
    var tt = setTimeout(()=>{
        console.timeEnd('获取数据');
    }, 3000);
}

console.info("程序执行完毕。")
console.log("!--------------------------------------------------------------------!");