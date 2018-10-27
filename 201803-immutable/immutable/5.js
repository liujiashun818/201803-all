let { is, Map } = require('immutable');
let obj1 = Map({ name: 'zfpx', age: 9 });
let obj2 = Map({ name: 'zfpx', age: 9 });
// true immutable 的is比较的值
console.log(Object.is(obj1, obj2), is(obj1, obj2));