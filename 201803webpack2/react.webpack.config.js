const path = require('path');
let DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name]_dll.js',//react.js
        library: '_dll_[name]'// var _dll_react = xxx
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}