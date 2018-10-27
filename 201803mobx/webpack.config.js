const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "react", "stage-0"],
                        plugins: ["transform-decorators-legacy"]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}