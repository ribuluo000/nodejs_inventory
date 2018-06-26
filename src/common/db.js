import mongoose from "mongoose";
import redis from "redis";
import config from "./config";
import bluebird from "bluebird";
import chalk from "chalk";
import mongoose_paginate from "mongoose-paginate";
mongoose.Promise = bluebird;

/*
 * 连接多表操作
 */
var mongodb = config.mongodb;
var conn1 = mongoose.createConnection(mongodb.conn1.path, mongodb.conn1.options);
var conn2 = mongoose.createConnection(mongodb.conn2.path, mongodb.conn2.options);

conn1.on('error', function (error) {
    MyLog.error('error occured from mongodb_conn1');
    console.error(
        chalk.red('Error in mongodb_conn1 connection: ' + error)
    );
});

conn1.once('open', function dbOpen() {
    MyLog.info('successfully opened the mongodb_conn1');
    console.log(
        chalk.green('连接数据库 mongodb_conn1 成功')
    );
});

conn2.on('error', function (error) {
    MyLog.error('error occured from mongodb_conn2');
    console.error(
        chalk.red('Error in mongodb_conn2 connection: ' + error)
    );
});

conn2.once('open', function dbOpen() {
    MyLog.info('successfully opened the mongodb_conn2');
    console.log(
        chalk.green('连接数据库 mongodb_conn2 成功')
    );
});

// redis连接
var redisConfig = config.redis;
var client = redis.createClient(redisConfig.redis_db0);

client.on('connect', function () {
    MyLog.info('redis_db0 connected');
    console.log(
        chalk.green('连接数据库 redis_db0 成功')
    );
});
client.on('error', function (error) {
    MyLog.error('error occured from redis_db0');
    console.error(
        chalk.red('Error in redis_db0 connection: ' + error)
    );
});

var redis_db1 = redis.createClient(redisConfig.redis_db1);
redis_db1.on('connect', function () {
    MyLog.info('redis_db1 connected');
    console.log(
        chalk.green('连接数据库 redis_db1 成功')
    );
});
redis_db1.on('error', function (error) {
    MyLog.error('error occured from redis_db1');
    console.error(
        chalk.red('Error in redis_db1 connection: ' + error)
    );
});

export default {
    mongoose : mongoose,
    mongoose_paginate : mongoose_paginate,
    mongodb_conn1 : conn1,
    mongodb_conn2 : conn2,
    redis_db0 : client,
    redis_db1 : redis_db1,
};