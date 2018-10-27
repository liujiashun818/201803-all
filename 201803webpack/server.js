let express = require('express');
let morgan = require('morgan');
const webpack = require('webpack');
/**
 * 1. 写法 webpack 集成一个express服务器 webpack-dev-server.
 * 2. 
 */
const webpackDevMiddleware = require('webpack-dev-middleware');
let app = express();
app.get('/api/user',function(req,res){
   res.send(req.url);
});
app.use(morgan('dev'));
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

app.listen(3000);