const { getOptions, interpolateName } = require('loader-utils');
const mime = require('mime');
function loader(content) {
    let { outputPath } = getOptions(this);

    let filename = interpolateName(this, outputPath || "[hash]", {
        content
    });// image/md5
    let ext = mime.getType(this.resourcePath);// / image/jpg
    filename = filename + "." + ext.slice(ext.lastIndexOf('/') + 1);
    //发射一个文件 向输出里保存一个文件
    this.emitFile(filename, content);
    return `module.exports = ${JSON.stringify(filename)}`;
}
loader.raw = true;
module.exports = loader;