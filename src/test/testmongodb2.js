/**
 * Created by nick on 2018/1/23.
 */
const dbName = 'test';
const url = 'mongodb://admin:admin123@172.16.34.14:27017/test'; //# 数据库为 test
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    insertMany(db.db(dbName), function () {
        db.close();
    });
});

var find = function (db, callback) {
    var cursor = db.collection('inventory').find({
        tags: [ "red", "blank" ]
    }).then(function(err,result){
        console.log(err,result);
        callback();
    });
    // console.log(cursor);
    // callback();
}


var insertMany= function (db, callback) {


    db.collection('supplies').insert([
        { "_id" : 121, "item" : "binder", "qty": 100 , "price": 12 },
        { "_id" : 122, "item" : "notebook", "qty": 200 , "price": 8 },
        { "_id" : 123, "item" : "pencil", "qty": 50 , "price": 6 },
        { "_id" : 124, "item" : "eraser", "qty": 150 , "price": 3 },

    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })

    return;

    db.collection('orders').insert([
        { "_id" : 111, "item" : "almonds", "price" : 12, "quantity" : 2 },
        { "_id" : 112, "item" : "pecans", "price" : 20, "quantity" : 1 }
    ])

    db.collection('items').insert([
        { "_id" : 111, "item" : "almonds", description: "almond clusters", "instock" : 120 },
        { "_id" : 112, "item" : "bread", description: "raisin and nut bread", "instock" : 80 },
        { "_id" : 113, "item" : "pecans", description: "candied pecans", "instock" : 60 }
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })

    return;

    db.collection('orders').insert([
        { "_id" : 11, "item" : "MON1003", "price" : 350, "quantity" : 2, "specs" :
            [ "27 inch", "Retina display", "1920x1080" ], "type" : "Monitor" }
    ])

    db.collection('inventory').insert([
        { "_id" : 11, "sku" : "MON1003", "type" : "Monitor", "instock" : 120,
            "size" : "27 inch", "resolution" : "1920x1080" },
        { "_id" : 21, "sku" : "MON1012", "type" : "Monitor", "instock" : 85,
            "size" : "23 inch", "resolution" : "1280x800" },
        { "_id" : 31, "sku" : "MON1031", "type" : "Monitor", "instock" : 60,
            "size" : "23 inch", "display_type" : "LED" }
    ])
        .then(function(result) {
        console.log(result);
        callback(result);
        // process result
    })

    return;


    db.collection('orders').insert([
        { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
        { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
        { "_id" : 3  }
    ])

    db.collection('inventory').insert([
        { "_id" : 1, "sku" : "almonds", description: "product 1", "instock" : 120 },
        { "_id" : 2, "sku" : "bread", description: "product 2", "instock" : 80 },
        { "_id" : 3, "sku" : "cashews", description: "product 3", "instock" : 60 },
        { "_id" : 4, "sku" : "pecans", description: "product 4", "instock" : 70 },
        { "_id" : 5, "sku": null, description: "Incomplete" },
        { "_id" : 6 }
    ])


    return;

    db.collection('inventory').insertMany([
        { item: "canvas",
            qty: 100,
            size: {h: 28, w: 35.5, uom: "cm"},
            status: "A"},
        { item: "journal",
            qty: 25,
            size: {h: 14, w: 21, uom: "cm"},
            status: "A"},
        { item: "mat",
            qty: 85,
            size: {h: 27.9, w: 35.5, uom: "cm"},
            status: "A"},
        { item: "mousepad",
            qty: 25,
            size: {h: 19, w: 22.85, uom: "cm"},
            status: "P"},
        { item: "notebook",
            qty: 50,
            size: {h: 8.5, w: 11, uom: "in"},
            status: "P"},
        { item: "paper",
            qty: 100,
            size: {h: 8.5, w: 11, uom: "in"},
            status: "D"},
        { item: "planner",
            qty: 75,
            size: {h: 22.85, w: 30, uom: "cm"},
            status: "D"},
        { item: "postcard",
            qty: 45,
            size: {h: 10, w: 15.25, uom: "cm"},
            status: "A"},
        { item: "sketchbook",
            qty: 80,
            size: {h: 14, w: 21, uom: "cm"},
            status: "A"},
        { item: "sketch pad",
            qty: 95,
            size: {h: 22.85, w: 30.5, uom: "cm"},
            status: "A"}
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })

    return;
    db.collection('inventory').insertMany([
        { _id: 1, item: null },
        { _id: 2 }
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })

    return;
    db.collection('inventory').insertMany([
        { item: "journal",
            status: "A",
            size: { h: 14, w: 21, uom: "cm" },
            instock: [ { warehouse: "A", qty: 5 } ]},
        { item: "notebook",
            status: "A",
            size: { h: 8.5, w: 11, uom: "in" },
            instock: [ { warehouse: "C", qty: 5 } ]},
        { item: "paper",
            status: "D",
            size: { h: 8.5, w: 11, uom: "in" },
            instock: [ { warehouse: "A", qty: 60 } ]},
        { item: "planner",
            status: "D",
            size: { h: 22.85, w: 30, uom: "cm"},
            instock: [ { warehouse: "A", qty: 40 } ]},
        { item: "postcard",
            status: "A",
            size: { h: 10, w: 15.25, uom: "cm" },
            instock: [
                { warehouse: "B", qty: 15 },
                { warehouse: "C", qty: 35 }]}
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })

    return;
    db.collection('inventory').insertMany([
        { item: "journal",
            instock: [
                { warehouse: "A", qty: 5 },
                { warehouse: "C", qty: 15 }]},
        { item: "notebook",
            instock: [
                { warehouse: "C", qty: 5 }]},
        { item: "paper",
            instock: [
                { warehouse: "A", qty: 60 },
                { warehouse: "B", qty: 15 }]},
        { item: "planner",
            instock: [
                { warehouse: "A", qty: 40 },
                { warehouse: "B", qty: 5 }]},
        { item: "postcard",
            instock: [
                { warehouse: "B", qty: 15 },
                { warehouse: "C", qty: 35 }]}
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        })
    return;
    db.collection('inventory').insertMany([
        { item: "journal",
            qty: 25,
            tags: ["blank", "red"],
            dim_cm: [14, 21]},
        { item: "notebook",
            qty: 50,
            tags: ["red", "blank"],
            dim_cm: [14, 21]},
        { item: "paper",
            qty: 100,
            tags: ["red", "blank", "plain"],
            dim_cm: [14, 21]},
        { item: "planner",
            qty: 75,
            tags: ["blank", "red"],
            dim_cm: [22.85, 30]},
        { item: "postcard",
            qty: 45,
            tags: ["blue"],
            dim_cm: [10, 15.25]}
    ])
        .then(function(result) {
            console.log(result);
            callback(result);
            // process result
        });
}
return;
MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    insertDocuments(db.db(dbName), function () {
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    findDocuments(db.db(dbName), function () {
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    updateDocument(db.db(dbName), function () {
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    removeDocument(db.db(dbName), function () {
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    indexCollection(db.db(dbName), function () {
        db.close();
    });
});

var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        { a : 1 }, { a : 2 }, { a : 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({ 'a' : 3 }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

var updateDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set : { b : 1 } }, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

var removeDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

var indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
        { "a" : 1 },
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};