/**
 * Created by nick on 2018/1/17.
 */

var server = require("./server");
var router = require("./router");

server.start(router.route);
