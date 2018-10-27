const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mock = require('./mock');
const bootstrapPath = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css');
// env 环境变量 argv命令行参数对象
module.exports = (env,argv)=>({
    optimization:{
        minimizer:argv.mode == 'production'?[
            new UglifyjsWebpackPlugin(),//压缩JS
            new OptimizeCssAssetsWebpackPlugin()//压缩JS
        ]:[]
    },
    entry: {main:'./src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath:'/'
    },
    resolve:{
      extensions:['.js','.jsx','.json','.css','scss','less'],
      alias:{
       // bootstrap:bootstrapPath
      },
      mainFiles:["index","root"],
      mainFields:["style","main"],
      modules:[
          path.resolve('node_modules')
      ],
      //寻找loader单独有一个配置
    //   resolveLoader:{
    //     modules:[
    //         path.resolve('node_modules'),
    //         path.resolve('src/loaders')
    //     ],
    //   }
    },
    watch:true,
    devServer: {
        //静态文件根目录  express express.static('dist')
        contentBase: './dist',
        port: 8080,
        host: 'localhost',
        /* proxy:{
            "/api":"http://localhost:3000"
        } */
        /* proxy:{
            // http://localhost:8080/api/users
            // http://localhost:3000/users
            "/api":{
                target:"http://localhost:3000",
                pathRewrite:{"^/api":""}
            }
        } */
        //webpack-dev-sever内部用的也是express  app=express();
        before(app){
          mock(app);
        }

    },
    //devtool:'eval-source-map',//在单独的文件中生成，可以映射到列
   // devtool:'cheap-modulue-source-map',//在单独文件中生成，不能映射到列
   // devtool:'eval-source-map',//在同一个文件生成，可以映射到列
   // devtool:'cheap-module-eva-source-map',//在同一个文件生成sourcemap,不能映射到列
   externals:{
       //key模块名 值就是说真正运行的时候从window的哪个属性上取值
      //jquery:'jQuery'
   },
   module: {
       //如果说个模块不需要解析
        noParse:/jquery|lodash/,
        rules: [
            {
                test:/\.jsx?$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['env','stage-0','react']
                    }
                },],
                include:path.resolve(__dirname,'src'),
                exclude:/node_modules/
            },
            {
                test: /\.css$/,
                //css-loader是解析 处理css引入的路径
                //style-loader用来把CSS代码转成JS代码，在执行的时候会向页面中注入一个style标签
                use: [{
                    //MiniCssExtractPlugin.loader负责收集所有的 CSS文件
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader","postcss-loader"]
            },
            {
                test: /\.scss$/,
                //css-loader是解析 处理css引入的路径
                //style-loader用来把CSS代码转成JS代码，在执行的时候会向页面中注入一个style标签
                use: [{
                    //MiniCssExtractPlugin.loader负责收集所有的 CSS文件
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader","sass-loader"]
            },
            {
                test: /\.less$/,
                //css-loader是解析 处理css引入的路径
                //style-loader用来把CSS代码转成JS代码，在执行的时候会向页面中注入一个style标签
                use: [{
                    //MiniCssExtractPlugin.loader负责收集所有的 CSS文件
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader","less-loader"]
            },
            {
                test:/\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:4096,
                            outputPath:'images',
                            publicPath:'/images'
                        }
                    }
                ]
            },
            {
                test:/\.html/,
                use:'html-withimg-loader'
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new webpack.ProvidePlugin({
            "_":"lodash"
        }),
        new webpack.BannerPlugin('zhufengpieuxn'),
        new CopyWebpackPlugin([
            {
                from:path.resolve(__dirname,'src/assets'),
                to:path.resolve(__dirname,'dist/assets')
            }
        ]),
        //new CleanWebpackPlugin([path.resolve(__dirname,'dist')]),
        //定义一些可以在模块中使用全局变化 
        new webpack.DefinePlugin({
            PRODUCTOIN:JSON.stringify(true),//是否是生产环境 
            VERSION:"1+1",
            INFO:{
                NAME:JSON.stringify("zfpx")
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)
    ]
})