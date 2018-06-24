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
    YBLog.error('error occured from Node_Api');
});

conn1.once('open', function dbOpen() {
    YBLog.info('successfully opened the Node_Api');
});


conn2.on('error', function() {
    YBLog.error('error occured from Addresses');
});

conn2.once('open', function dbOpen() {
    YBLog.info('successfully opened the Addresses');
});


// redis连接
var redisConfig = config.redis;
var client = redis.createClient(redisConfig.redis_db0);

client.on('connect', function() {
    YBLog.info('redis connected');
});
client.on('error', function() {
    YBLog.error('error occured from redis');
});

var redis_db1 = redis.createClient(redisConfig.redis_db1);
redis_db1.on('connect', function() {
    YBLog.info('redis_db1 connected');
});
redis_db1.on('error', function() {
    YBLog.error('error occured from redis_db1');
});


exports.mongoose = mongoose;
exports.conn1 = conn1;
exports.conn2 = conn2;
exports.redis = client;
exports.redis_db1 = redis_db1;