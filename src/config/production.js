'use strict';

module.exports = {

    port: 8001,
    "debug_mode" : "RELEASE",
    "mongodb" : {
        "conn1" : {
            "path" : "mongodb://@cluster0-shard-00-00-edl3p.mongodb.net:27017,cluster0-shard-00-01-edl3p.mongodb.net:27017,cluster0-shard-00-02-edl3p.mongodb.net:27017/inventory?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
            "options" : {
                "user" : "dbuser001",
                "pass" : "passuser001",
                "port" : 27017
            }
        },
        "conn2" : {
            "path" : "mongodb://@cluster0-shard-00-00-edl3p.mongodb.net:27017,cluster0-shard-00-01-edl3p.mongodb.net:27017,cluster0-shard-00-02-edl3p.mongodb.net:27017/inventory?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
            "options" : {
                "user" : "dbuser001",
                "pass" : "passuser001",
                "port" : 27017
            }
        },
    },
    "redis" : {
        "redis_db0" : {
            "host" : "172.16.34.14",
            "port" : 6379,
            "password" : "redispwd",
            "db" : 0
        },
        "redis_db1" : {
            "host" : "172.16.34.14",
            "port" : 6379,
            "password" : "redispwd",
            "db" : 1
        }
    },
}