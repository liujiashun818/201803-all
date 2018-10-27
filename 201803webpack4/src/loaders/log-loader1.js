//source就是接收到的源文件的内容
let loader = function (source) {
    let cb = this.async();
    console.log('loader1');
    cb(null, source);
}
module.exports = loader;
loader.pitch = function () {
    console.log('pitch1');
    
}