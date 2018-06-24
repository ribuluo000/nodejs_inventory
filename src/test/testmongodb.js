/**
 * Created by nick on 2018/1/22.
 */

    // Database Name
const dbName = 'test';
const DB_CONN_STR = 'mongodb://admin:admin123@172.16.34.14:27017/test'; //# 数据库为 test
var MongoClient = require('mongodb').MongoClient;

console.log("!--------------------------------------------------------------------!");

{
     

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        if (err) throw err;
        console.log("数据库已创建!");
        db.close();
    });

}

console.log("!--------------------------------------------------------------------!");
{

     
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db("mydb");
        dbase.createCollection('runoob', function (err, res) {
            if (err) throw err;
            console.log("创建集合!");
            db.close();
        });
    });

}


console.log("!--------------------------------------------------------------------!");
{

     

    var insertData = function(db, callback) {
        //连接到表 site
        var collection = db.db(dbName).collection('site');
        //插入数据
        var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
        collection.insert(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        insertData(db, function(result) {
            console.log(result);
            db.close();
        });
    });

}
console.log("!--------------------------------------------------------------------!");
{

     

    var insertData = function(db, callback) {
        //连接到表 site
        var collection = db.db(dbName).collection('site');
        //插入数据
        var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
        collection.insert(data, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        insertData(db, function(result) {
            console.log(result);
            db.close();
        });
    });

}
console.log("!--------------------------------------------------------------------!");
{

     

    var selectData = function(db, callback) {
        //连接到表
        var collection = db.db(dbName).collection('site');
        //查询数据
        var whereStr = {"name":'菜鸟教程'};
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        selectData(db, function(result) {
            console.log(result);
            db.close();
        });
    });

}
console.log("!--------------------------------------------------------------------!");
{

     

    var updateData = function(db, callback) {
        //连接到表
        var collection = db.db(dbName).collection('site');
        //更新数据
        var whereStr = {"name":'菜鸟教程'};
        var updateStr = {$set: { "url" : "https://www.runoob.com" }};
        collection.update(whereStr,updateStr, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        updateData(db, function(result) {
            console.log(result);
            db.close();
        });
    });

}
console.log("!--------------------------------------------------------------------!");
{

     

    var delData = function(db, callback) {
        //连接到表
        var collection = db.db(dbName).collection('site');
        //删除数据
        var whereStr = {"name":'菜鸟工具'};
        collection.remove(whereStr, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        delData(db, function(result) {
            console.log(result);
            db.close();
        });
    });

}
console.log("!--------------------------------------------------------------------!");
console.log("!--------------------------------------------------------------------!");
