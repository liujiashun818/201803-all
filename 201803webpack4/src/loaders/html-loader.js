let { getOptions } = require('loader-utils');
const path = require('path');
const fs = require('fs');
function loader(source) {
    let cb = this.async();//把loader变成异步函数
    let { layout } = getOptions(this);
    //         @layout(../src/loaders/main1_layout.html)
    let reg = /@layout\((.+)\)/;
    let result = source.match(reg);
    if (result) {
        let customeLayout = result[1];
        customeLayout = path.resolve(this.context, customeLayout);
        source = source.replace(result[0], '');
        fs.readFile(customeLayout, 'utf8', (err, data) => {
            source = data.replace('{{__content__}}', source);
            cb(err, `module.exports = ${JSON.stringify(source)}`);
        });
    } else {
        fs.readFile(layout, 'utf8', (err, data) => {
            source = data.replace('{{__content__}}', source);
            cb(err, `module.exports = ${JSON.stringify(source)}`);
        });
    }

}

module.exports = loader;