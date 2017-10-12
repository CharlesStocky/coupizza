'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _filterCodes = require('../filterCodes');

var _filterCodes2 = _interopRequireDefault(_filterCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
  if (!req.query.zip) {
    res.json({ 'codelist': [{ 'code': 'No zip code entered' }], 'latitude': 0, 'longitude': 0 });
  }
  (0, _filterCodes2.default)(req.query.zip).then(function (arr) {
    res.json(arr);
  });
});

module.exports = router;