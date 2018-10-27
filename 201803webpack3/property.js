// let obj = {};
// value emunerable writable configurable get set
// Object.defineProperty(obj, 'name', {
//     get() {
//         console.log('你正在获取name属性');
//         return 'zfpx';
//     }
// });
// console.log(obj.name);

let n = function (module) {
    var getter = function () { return module; };
    Object.defineProperty(getter, 'a', { enumerable: true, get: getter });
    return getter;
}
let mod = 'hello';
let ret = n(mod);
console.log(ret['a']);