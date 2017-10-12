var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://localhost:27017/papa'; 

(()=>{
  return MongoClient.connect(url)
    .then((db)=>{
      return db.collection('codes').insertOne({"zip": "99999", "code": "This is a code."})
    })
    .then((db)=>{
      console.log('"papa" db created');
      console.log('"codes" collection created.'); 
      console.log('Inserted document with a zipcode of "99999"'); 
      return db; 
    })
})()
