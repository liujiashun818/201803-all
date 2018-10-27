let { observable, observe } = require('mobx');
// let o1 = observable({ name: 'zfpx' });
// console.log(o1);
// observe(o1, change => console.log(change));
// o1.name = 'zfpx2';
// let arr1 = observable([1, 2, 3]);
// console.log(arr1);
// arr1.pop();
// arr1.push(4);
// arr1.unshift(0);
// console.log(arr1);
//The provided value could not be converted into an observable
/
let num = observable.box(1);
observe(num, c => console.log(c));
console.log(num.get());
num.set(2);

let bool = observable.box(true);
console.log(bool.get());

let str = observable.box('hello');
console.log(str.get());





















//Proxy 代理 
/**
let p1 = new Proxy({ name: 'zfpx', age: 9 }, {
    get: function (target, key) {
        console.log(`get ${key}`);
        return Reflect.get(target, key);
    },
    set: function (target, key, value) {
        console.log(`set ${key} ${value}`);
        return Reflect.set(target, key, value);
    }
});
console.log(p1.name, p1.age);
p1.age = 10;
console.log(p1.name, p1.age);
 */
