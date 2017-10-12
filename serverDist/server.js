'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pug = require('pug');

var _pug2 = _interopRequireDefault(_pug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _apiCodelist = require('./routes/apiCodelist');

var _apiCodelist2 = _interopRequireDefault(_apiCodelist);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var middleware = void 0;

//---------------------------HMR settings---------------------------------

var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');
var compiler = webpack(webpackConfig);

app.use((0, _webpackDevMiddleware2.default)(compiler, {
  noInfo: false, publicPath: webpackConfig.output.publicPath
}));

app.use(middleware = (0, _webpackHotMiddleware2.default)(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use(_express2.default.static(__dirname + '/../dist'));
app.set('view engine', 'pug'); //using pug as it allows for vanilla html 
app.set('views', _path2.default.join(__dirname, '../dist'));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/codelist', _apiCodelist2.default);
app.use('*', function (req, res) {
  res.render('index');
});

app.listen( /*process.env.port ||*/'8080', function () {
  console.log('server listening');
});