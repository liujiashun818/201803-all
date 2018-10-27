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
                    loader: 'babel-loader',
                    options: {
                        presets: [['env',{modules: false }], "stage-0", "react"],
                        plugins: ["transform-decorators-legacy"]
                    }
                }]
            }
        ]
    }
}