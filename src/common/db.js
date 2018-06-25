import mongoose from 'mongoose';
import redis from 'redis';
import config from './config';
import bluebird from 'bluebird';
mongoose.Promise = bluebird;

/*
 * 连接多表操作
 */
var mongodb = config.mongodb;
var conn1 = mongoose.createConnection(mongodb.conn1.path, mongodb.conn1.options);
var conn2 = mongoose.createConnection(mongodb.conn2.path, mongodb.conn2.options);

conn1.on('error', function() {
    MyLog.error('error occured from mongodb_conn1');
});

conn1.once('open', function dbOpen() {
    MyLog.info('successfully opened the mongodb_conn1');
});


conn2.on('error', function() {
    MyLog.error('error occured from mongodb_conn2');
});

conn2.once('open', function dbOpen() {
    MyLog.info('successfully opened the mongodb_conn2');
});


// redis连接
var redisConfig = config.redis;
var client = redis.createClient(redisConfig.redis_db0);

client.on('connect', function() {
    MyLog.info('redis_db0 connected');
});
client.on('error', function() {
    MyLog.error('error occured from redis_db0');
});

var redis_db1 = redis.createClient(redisConfig.redis_db1);
redis_db1.on('connect', function() {
    MyLog.info('redis_db1 connected');
});
redis_db1.on('error', function() {
    MyLog.error('error occured from redis_db1');
});


export default {
    mongoose:mongoose,
    mongodb_conn1:conn1,
    mongodb_conn2:conn2,
    redis_db0:client,
    redis_db1:redis_db1,
};