const path = require('path');
let DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const HappyPack = require('happypack');
/* let entry = {
    key1:'value1',
    key2:'value2'
}
let htmlPlugins = [];
for(let key in entry){
    htmlPlugins.push(new HtmlWebpackPlugin({
        template:'index.html',
        filename:`${key}.html`
    }));
} */
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'happypack/loader?id=babel'
                }]
            },
            {
                test: /\.css?$/,
                use: [{
                    loader: 'happypack/loader?id=css'
                }]
            }
        ]
    },
    plugins: [
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist/react.manifest.json')
        }),
        
        new HappyPack({
            id: 'babel',
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [['env',{modules: false }], "stage-0", "react"],
                    plugins: ["transform-decorators-legacy"]
                }
            }]
        }),
        new HappyPack({
            id: 'css',
            use: ['style-loader', 'css-loader'],
            threads: 3, //代表开启几个子进程去处理这一类型的文件
            verbose: true //是否允许输出日志
        })
    ]
}