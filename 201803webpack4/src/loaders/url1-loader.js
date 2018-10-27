let { getOptions } = require('loader-utils');
function loader(source) {
    let options = getOptions(this);
    let { limit, fallback } = options;
    if (!limit || source.length < limit) {
        let base64 = `data:${mimetype};base64,${source.toString('base64')}`;
        return `module.exports = ${JSON.stringify(base64)}`;
    } else {
        let file1Loader = require(fallback || 'file-loader');
        return file1Loader.call(this, source);
    }
}
loader.raw = true;
module.exports = loader;
