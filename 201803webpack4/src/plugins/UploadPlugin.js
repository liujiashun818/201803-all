//在文件保存完成之后自动把打包好的文件上传到CDN上
const path = require('path');
const qiniu = require('qiniu');
class UploadPlugin {
   constructor(options){
       this.options = options;
   }
   apply(compiler){
      compiler.hooks.afterEmit.tap('UploadPlugin',(compilation)=>{
        console.log('afterEmit');
          //先拿到要上传的的资源
         let assets = compilation.assets;
         //获取到的是一个待上传的文件组成的数组 ['xxx.js','index.html']
         let files = Object.keys(assets);
         console.log('files',files);
         let promises = files.map(asset=>this.upload(asset,path.resolve(__dirname,'../../dist',asset)));
        return Promise.all(promises);
      });
   }
   upload(filename,localFile){
       console.log('filename,localFile',filename,localFile);
       return new Promise(function(resolve,reject){
            let {bucket='video',domain="img.zhufenpeixun.cn",accessKey='fi5imW04AkxJItuFbbRy1ffH1HIoo17HbWOXw5fV',secretKey='ru__Na4qIor4-V7U4AOJyp2KBUYEw1NWduiJ4Pby'}={};
            let mac=new qiniu.auth.digest.Mac(accessKey,secretKey);
            let options = {
                scope: bucket,
            };

            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken=putPolicy.uploadToken(mac);
            let config=new qiniu.conf.Config();
            let formUploader=new qiniu.form_up.FormUploader(config);
            let putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(uploadToken,filename,localFile,putExtra,(err,body,info)=>{
                console.log(err);
                console.log(body);
                err? reject(err):resolve(body);
            });
       });
   }
}
module.exports = UploadPlugin;