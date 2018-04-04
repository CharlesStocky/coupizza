import { MongoClient } from 'mongodb';
import NodeGeocoder from 'node-geocoder'; 
import Promise from 'bluebird';  

const options = {
  provider: 'google', 
  apiKey: process.env.google_apiKey
}

const geocoder = NodeGeocoder(options)

let geoFunc = (queryStr) =>{
  return geocoder.geocode(queryStr)
    .then((geoCoded)=>{
      if(geoCoded.length === 0 || geoCoded[0].zipcode !== queryStr){ //geocoder sometimes returns a random address upon invalid zip code
        return {'code': 'Invalid zip code'}
      }
      return geoCoded
    })
    .catch((err)=>{ //catch error only references status alerts with geocoder (IE limit reached, incorrent auth credentials, etc)
      console.log(err) 
    })
}

let mongoArr = ()=>{
  return MongoClient.connect('mongodb://localhost:27017/papa') 
    .then((db)=>{
      return db.collection('codes').find().toArray();  
    })
    .catch((err)=>{
      console.log(err) 
    })
}

var filterCodes = (queryStr) => {
  let resObj = {
    codelist: [], 
    latitude: 0, 
    longitude: 0
  }
  let geo = geoFunc; 
  let filterArr = mongoArr;
  return Promise.all([geo(queryStr), filterArr()]).then((Results)=>{  
    if(Results[0].code && Results[0].code.includes('Invalid')){
      resObj.codelist.push(Results[0])
      return resObj 
    }
    Results[1].filter((codeObj)=>{
      if(codeObj.location.toLowerCase().includes(Results[0][0].city.toLowerCase())){//geocoder returns an array
        resObj.codelist.push(codeObj);  
      }else if (codeObj.location.includes("any")){//for codes that work nationwide
        resObj.codelist.push(codeObj)
      }else{
        return false;  
      } 
    }) 
    resObj.latitude = Results[0][0].latitude
    resObj.longitude = Results[0][0].longitude
    return resObj
  })
  .catch((err)=>{
    console.log(err)
  })
}

module.exports = filterCodes; 
