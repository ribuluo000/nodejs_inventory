/**
 * Created by nick on 2018/1/19.
 */
{

    //express_demo.js 文件
    var express = require('express');
    var app = express();
    var fs = require("fs");
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser')
    var multer  = require('multer');
    // 创建 application/x-www-form-urlencoded 编码解析
    var urlencodedParser = bodyParser.urlencoded({ extended: false })


    app.use(cookieParser())
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(multer({ dest: '/tmp/'}).array('image'));



    //  主页输出 "Hello World"
    app.get('/', function (req, res) {
        console.log("主页 GET 请求");
        res.send('Hello GET');
    })


    //  POST 请求
    app.post('/', function (req, res) {
        console.log("主页 POST 请求");
        res.send('Hello POST');
    })

    //  /del_user 页面响应
    app.get('/del_user', function (req, res) {
        console.log("/del_user 响应 DELETE 请求");///Users/nick/Downloads/0Nick/test/nodejs/node1/public/images/activity.png
        res.send('删除页面');
    })

    //  /list_user 页面 GET 请求
    app.get('/list_user', function (req, res) {
        console.log("/list_user GET 请求");
        res.send('用户列表页面');
    })

    // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
    app.get('/ab*cd', function(req, res) {
        console.log("/ab*cd GET 请求");
        res.send('正则匹配');
    })
    app.get('/index1.html', function (req, res) {
        res.sendFile( __dirname + "/public/html/" + "index1.html" );
    })

    app.get('/process_get', function (req, res) {

        // 输出 JSON 格式
        var response = {
            "first_name":req.query.first_name,
            "last_name":req.query.last_name
        };
        console.log(response);
        res.end(JSON.stringify(response));
    })
    app.post('/process_post', urlencodedParser, function (req, res) {

        // 输出 JSON 格式
        var response = {
            "first_name":req.body.first_name,
            "last_name":req.body.last_name
        };
        console.log(response);
        res.end(JSON.stringify(response));
    })

    app.post('/file_upload', function (req, res) {
        console.log("Cookies: ", req.cookies)
        console.log(req.files);  // 上传的文件信息

        var des_file = __dirname + "/" + req.files[0].originalname;
        fs.readFile( req.files[0].path, function (err, data) {
            if( err ){
                console.log( err );
                return;
            }

            fs.writeFile(des_file, data, function (err) {
                if( err ){
                    console.log( err );
                    response = {
                        message:'File uploaded failed',
                        filename:req.files[0].originalname
                    };
                }else{
                    response = {
                        message:'File uploaded successfully',
                        filename:req.files[0].originalname
                    };
                }
                console.log( response );
                res.end( JSON.stringify( response ) );
            });
        });
    })
    app.get('/listUsers', function (req, res) {
        fs.readFile( __dirname + "/public/json/" + "users.json", 'utf8', function (err, data) {
            console.log( data );
            res.end( data );
        });
    })

    //添加的新用户数据
    var user = {
        "user4" : {
            "name" : "mohit",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
        }
    }

    app.get('/addUser', function (req, res) {
        // 读取已存在的数据
        fs.readFile( __dirname + "/public/json/" + "users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            data["user4"] = user["user4"];
            console.log( data );
            res.end( JSON.stringify(data));
        });
    })

    app.get('/user_id/:id', function (req, res) {
        // 首先我们读取已存在的用户
        fs.readFile( __dirname + "/public/json/" + "users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            var user = data["user" + req.params.id]
            console.log( user );
            res.end( JSON.stringify(user));
        });
    })
    app.get('/deleteUser/:id', function (req, res) {

        // First read existing users.
        fs.readFile( __dirname + "/public/json/" + "users.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            delete data["user" + req.params.id];

            console.log( data );
            res.end( JSON.stringify(data));
        });
    })


    var server = app.listen(3004, function () {

        var host = server.address().address
        var port = server.address().port

        console.log("应用实例，访问地址为 http://%s:%s", host, port)

    })

}