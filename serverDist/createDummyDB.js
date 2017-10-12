'use strict';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/papa';

(function () {
  return MongoClient.connect(url).then(function (db) {
    return db.collection('codes').insertOne({ "zip": "99999", "code": "This is a code." });
  }).then(function (db) {
    console.log('"papa" db created');
    console.log('"codes" collection created.');
    console.log('Inserted document with a zipcode of "99999"');
    return db;
  });
})();