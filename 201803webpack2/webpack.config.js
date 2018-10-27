const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        pageA: './src/pageA',
        pageB: './src/pageB',
        pageC: './src/pageC'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    optimization: {
        //分割代码块
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,//最小重复的次数
                    minSize: 0//最小提取字节数
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'pageA.html',
            chunks:['pageA']
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'pageB.html',
            chunks:['pageB']
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'pageC.html',
            chunks:['pageC']
        })
    ]
}