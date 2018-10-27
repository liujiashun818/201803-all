export default function (webpackConfig) {
    // 做一些修改
    webpackConfig.devtool = 'cheap-module-source-map';

    // 返回新的 webpack 配置
    return webpackConfig;
}