const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    entry:{
        pageA:'./src/pageA',
        pageB:'./src/pageB'
    },
    output:{
        path:path.resolve('dist'),
        filename:'[name].js'
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
        })
    ]
}