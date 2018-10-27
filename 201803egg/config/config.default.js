module.exports = app => {
    let config = {};
    config.keys = 'zfpx';//加密cookie

    config.view = {
        defaultViewEngine: 'ejs',//配置默认的模板引擎
        mapping: {//如果模板是以.ejs结尾的，则用ejs模板引擎处理
            ".ejs": 'ejs'
        }
    }
    //启动的中间件
    config.middleware = ['time', 'robot']
    config.robot = {
        uas: [
            /Chrome/
        ]
    }
    config.time = {
    }
    return config;
}