//source就是接收到的源文件的内容
let loader = function (source, remaindingLoader, leftLoaders, data) {
    let cb = this.async();
    console.log('loader2');
    cb(null, source);
}

module.exports = loader;
loader.pitch = function () {
    console.log('pitch2');
    return "2";
}