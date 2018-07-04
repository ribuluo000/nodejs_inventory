'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';
import chalk from 'chalk';
// mongoose.connect(config.url, {useMongoClient:true});
mongoose.Promise = global.Promise;
var acl = require('acl');

mongoose.connect(config.url, function(err){
    if(!err){
        acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
        // acl.allow('guest', 'business', 'view');
        global.acl = acl;
        // console.log('global.acl',global.acl);
        MyPermissionUtil.init(acl);
    }
});
const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
