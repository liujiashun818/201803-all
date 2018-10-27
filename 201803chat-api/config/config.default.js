'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534063656275_6187';

  // add your config here
  config.middleware = [];
  //指定mongoose的连接url
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/chat'
  }
  config.security = {
    crsf: false,
    domainWhiteList: ['http://127.0.0.1:8000']
  }
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler'];
  config.io = {
    init: {},
    namespace: {
      "/": {
        connectionMiddleware: ['connection'],
        packetMiddleware: ['packet']
      }
    },
    redis: {
      host: '127.0.0.1',
      port: 6379
    }
  }
  return config;
};
