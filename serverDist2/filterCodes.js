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
    console.log(geoCoded);
    return geoCoded;
  });
};

var mongoArr = function mongoArr() {
  return _mongodb.MongoClient.connect('mongodb://PapaTom:3xplosions@localhost:27017/papa').then(function (db) {
    console.log(db);
    return db.collection('codes').find().toArray();
  });
};

var filterCodes = function filterCodes(queryStr) {
  var codelist = [];
  var geo = geoFunc;
  var filterArr = mongoArr;
  console.log(codelist);
  return _bluebird2.default.all([geo(queryStr), filterArr()]).then(function (Results) {
    Results[1].filter(function (codeObj) {
      if (codeObj.location.toLowerCase().includes(Results[0][0].city.toLowerCase())) {
        //geocoder returns an array
        codelist.push(codeObj.code);
      } else if (codeObj.location.includes("any")) {
        codelist.push(codeObj.code);
      } else {
        return false;
      }
    });
    console.log(codelist);
    return codelist;
  });
};

module.exports = filterCodes;
