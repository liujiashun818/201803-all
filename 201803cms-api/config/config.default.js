'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532831179029_8381';

  // add your config here
  config.middleware = [];

  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'cms',
    },
    app: true, // 把此mysql的操作挂载到app上。 app.mysql
  };

  config.security = {
    csrf: false,
    domainWhiteList: ['http://localhost:8000']
  };
  config.cors = {
    credentials: true
  }
  config.jwtSecret = 'zfpx';
  config.multipart = {
    fileSize: '50mb',
  };
  config.jwtSecret = 'zfpx';
  config.multipart = {
    fileSize: '50mb',
    whitelist: [
      '.png', '.jpg'
    ],
  };
  return config;
};
