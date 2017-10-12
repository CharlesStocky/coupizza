'use strict';

var _mongodb = require('mongodb');

var _nodeGeocoder = require('node-geocoder');

var _nodeGeocoder2 = _interopRequireDefault(_nodeGeocoder);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  provider: 'google',
  apiKey: process.env.google_apiKey
};

var geocoder = (0, _nodeGeocoder2.default)(options);

var geoFunc = function geoFunc(queryStr) {
  return geocoder.geocode(queryStr).then(function (geoCoded) {
    console.log(queryStr.length);
    if (geoCoded.length === 0 || geoCoded[0].zipcode !== queryStr) {
      //geocoder sometimes returns a random address upon invalid zip code
      return { 'code': 'Invalid zip code' };
    }
    return geoCoded;
  }).catch(function (err) {
    //catch error only references status alerts with geocoder (IE limit reached, incorrent auth credentials, etc)
    console.log(err);
  });
};

var mongoArr = function mongoArr() {
  return _mongodb.MongoClient.connect('mongodb://localhost:27017/papa').then(function (db) {
    return db.collection('codes').find().toArray();
  }).catch(function (err) {
    console.log(err);
  });
};

var filterCodes = function filterCodes(queryStr) {
  var resObj = {
    codelist: [],
    latitude: 0,
    longitude: 0
  };
  var geo = geoFunc;
  var filterArr = mongoArr;
  return _bluebird2.default.all([geo(queryStr), filterArr()]).then(function (Results) {
    if (Results[0].code && Results[0].code.includes('Invalid')) {
      resObj.codelist.push(Results[0]);
      return resObj;
    }
    Results[1].filter(function (codeObj) {
      if (codeObj.location.toLowerCase().includes(Results[0][0].city.toLowerCase())) {
        //geocoder returns an array
        resObj.codelist.push(codeObj);
      } else if (codeObj.location.includes("any")) {
        //for codes that work nationwide
        resObj.codelist.push(codeObj);
      } else {
        return false;
      }
    });
    resObj.latitude = Results[0][0].latitude;
    resObj.longitude = Results[0][0].longitude;
    return resObj;
  }).catch(function (err) {
    console.log(err);
  });
};

module.exports = filterCodes;