/**
 * Created by nick on 2018/1/19.
 */

{

    var http = require('http');
    var url = require('url');
    var util = require('util');

    http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        var params = url.parse(req.url, true).query;
        res.write("网站名：" + params.name);
        res.write("\n");
        res.write("网站 URL：" + params.url);
        // res.end();
        res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3000);

}

console.log("!--------------------------------------------------------------------!");
{

    var http = require('http');
    var querystring = require('querystring');

    http.createServer(function(req, res){
        res.writeHead(404, {'Content-Type': 'text/html'});
        // 定义了一个post变量，用于暂存请求体的信息
        var post = '';

        // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        req.on('data', function(chunk){
            post += chunk;
        });

        // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        req.on('end', function(){
            post = querystring.parse(post);
            res.end(util.inspect(post));
        });
    }).listen(3001);

}
console.log("!--------------------------------------------------------------------!");
{

    var http = require('http');
    var querystring = require('querystring');

    var postHTML =
        '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
        '<body>' +
        '<form method="post">' +
        '网站名： <input name="name"><br>' +
        '网站 URL： <input name="url"><br>' +
        '<input type="submit">' +
        '</form>' +
        '</body></html>';

    http.createServer(function (req, res) {
        var body = "";
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            // 解析参数
            body = querystring.parse(body);
            // 设置响应头部信息及编码
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

            if(body.name && body.url) { // 输出提交的数据
                res.write("网站名：" + body.name);
                res.write("<br>");
                res.write("网站 URL：" + body.url);
            } else {  // 输出表单
                res.write(postHTML);
            }
            res.end();
        });
    }).listen(3002);

}
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");