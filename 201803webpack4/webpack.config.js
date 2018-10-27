const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./src/plugins/DonePlugin');
const Done2Plugin = require('./src/plugins/Done2Plugin');
const Done3Plugin = require('./src/plugins/Done3Plugin');
const OptimizePlugin = require('./src/plugins/OptimizePlugin');
const FileListPlugin = require('./src/plugins/FileListPlugin');
const HtmlInlinePlugin  = require('./src/plugins/HtmlInlinePlugin');
const UploadPlugin  = require('./src/plugins/UploadPlugin');
module.exports = {
    mode: "development",
    entry: './src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[hash].js',
        publicPath:'http://7xn1py.media1.z0.glb.clouddn.com'
    },
    module: {},
    plugins: [
       new HtmlWebpackPlugin({
           template:'./src/index.html',
           filename:'[name].[hash].html'
       }),
       new UploadPlugin()
    ]
}