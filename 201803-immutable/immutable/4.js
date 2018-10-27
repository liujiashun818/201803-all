function invoke(obj) {
    obj.name = '9';
}
let immutable = require('immutable');
function handle() {
    let obj = immutable.fromJS({ name: 'zfpx' });
    invoke(obj);
    console.log(obj.get('name'));//9
}
handle();