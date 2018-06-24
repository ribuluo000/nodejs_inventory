/**
 * Created by nick on 2018/1/18.
 */

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
{
    var fs = require("fs");

    console.log("准备打开文件！");
    fs.stat('input.txt', function (err, stats) {
        if (err) {
            return console.error(err);
        }
        console.log(stats);
        console.log("读取文件信息成功！");

        // 检测文件类型
        console.log("是否为文件(isFile) ? " + stats.isFile());
        console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
    });
}

console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");
    var buf = new Buffer(1024);

    console.log("准备打开已存在的文件！");
    fs.open('input.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
        console.log("准备读取文件：");
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){
                console.log(err);
            }
            console.log(bytes + "  字节被读取");

            // 仅输出读取的字节
            if(bytes > 0){
                console.log(buf.slice(0, bytes).toString());
            }
        });
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");
    var buf = new Buffer(1024);

    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
        console.log("准备读取文件！");
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){
                console.log(err);
            }

            // 仅输出读取的字节
            if(bytes > 0){
                console.log(buf.slice(0, bytes).toString());
            }

            // 关闭文件
            fs.close(fd, function(err){
                if (err){
                    console.log(err);
                }
                console.log("文件关闭成功");
            });
        });
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");
    var buf = new Buffer(1024);

    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
        console.log("截取10字节后的文件内容。");

        // 截取文件
        fs.ftruncate(fd, 10, function(err){
            if (err){
                console.log(err);
            }
            console.log("文件截取成功。");
            console.log("读取相同的文件");
            fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
                if (err){
                    console.log(err);
                }

                // 仅输出读取的字节
                if(bytes > 0){
                    console.log(buf.slice(0, bytes).toString());
                }

                // 关闭文件
                fs.close(fd, function(err){
                    if (err){
                        console.log(err);
                    }
                    console.log("文件关闭成功！");
                });
            });
        });
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");

    console.log("准备删除文件！");
    fs.unlink('input.txt', function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("文件删除成功！");
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");

    console.log("创建目录 /tmp/test/");
    fs.mkdir("/tmp/test/",function(err){
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功。");
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");

    console.log("查看 /tmp/ 目录");
    fs.readdir("/tmp/",function(err, files){
        if (err) {
            return console.error(err);
        }
        files.forEach( function (file){
            console.log( file );
        });
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");

    console.log("查看 /tmp 目录");
    fs.readdir("/tmp",function(err, files){
        if (err) {
            return console.error(err);
        }
        files.forEach( function (file){
            console.log( file );
        });
    });
}
console.log("!--------------------------------------------------------------------!");
{
    var fs = require("fs");
    // 执行前创建一个空的 /tmp/test 目录
    console.log("准备删除目录 /tmp/test");
    fs.rmdir("/tmp/test",function(err){
        if (err) {
            return console.error(err);
        }
        console.log("读取 /tmp 目录");
        fs.readdir("/tmp/",function(err, files){
            if (err) {
                return console.error(err);
            }
            files.forEach( function (file){
                console.log( file );
            });
        });
    });
}
console.log("!--------------------------------------------------------------------!");