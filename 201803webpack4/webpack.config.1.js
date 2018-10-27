const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
let htmls = fs.readdirSync(path.resolve(__dirname, './src/html'));
const htmlPlugins = htmls.map(html => new HtmlWebpackPlugin({
    template: `./src/html/${html}`,
    filename: html,
    chunks: [html]
}));
module.exports = {
    mode: "development",
    entry: {
        main1: './src/main1.js',
        main2: './src/main2.js'
    },
    output: {
        filename: '[name].js'
    },
    //单独配置解析loader路径
    resolveLoader: {
        modules: [
            path.resolve('node_modules'),
            path.resolve('src', 'loaders'),
        ]
    },
    module: {
        rules: [
            //最左边的loader必须一个脚本，但是这一类型最左边的loader一般不能链式使用
            {
                test: /\.less$/,
                use: ['style1-loader', 'less1-loader'],
                //use: ['exact-loader', 'less1-loader']，
                //放在最左边的loder必须返回一个JS脚 本因为这个脚本要拿过进行AST语法树分析的      
                //use: ['less1-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url1-loader',
                    options: {
                        limit: 1024,
                        fallback: 'file-loader'
                    }
                }
            },
            {
                test: /\.(html|htm)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        layout: path.resolve(__dirname, 'src/loaders/layout.html')
                    }
                }
            }
        ]
    },
    plugins: [
        ...htmlPlugins
    ]
}