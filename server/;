import Express from 'express'; 
import { Router } from 'express';
import fs from 'fs'; 
import pug from 'pug'; 
import path from 'path'
import apiCodelist from './routes/apiCodelist'; 
import webpackDevMiddleware from 'webpack-dev-middleware'; 
import webpackHotMiddleware from 'webpack-hot-middleware'; 
import bodyParser from 'body-parser'; 

const app = Express(); 
let middleware;

//---------------------------HMR settings---------------------------------

let webpack = require('webpack'); 
let webpackConfig = require('../webpack.config.js')
let compiler = webpack(webpackConfig); 

app.use(webpackDevMiddleware(compiler, {
  noInfo: false, publicPath: webpackConfig.output.publicPath
})); 

app.use(middleware = webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.use(Express.static(__dirname + '/../dist')); 
app.set('view engine', 'pug'); //using pug as it allows for vanilla html 
app.set('views', path.join(__dirname, '../dist')); 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/codelist', apiCodelist); 
app.use('*', (req, res)=>{
  res.render('index')
}); 

app.listen(/*process.env.port ||*/'8080', ()=>{
  console.log('server listening'); 
})
