/**
//@testable
class Person {

}
function testable(target) {
    target.testable = true;
}
testable(Person);
console.log(Person.testable);

//target类 key类的属性 discriptor描述器
function readonly(target, key, discriptor) {
    discriptor.writable = false;
}
class Circle {
    @readonly PI = 3.14;//这是实例的属性
}
let c1 = new Circle();

//Cannot assign to read only property 'PI' of object
c1.PI = '3.15';
console.log(c1.PI);

/**
let obj = {};
obj.name = 'zfpx';
Object.defineProperty(obj, 'age', {
    value: 9,//实际的值
    enumerable: false,//是否可枚举
    writable: true,//是否可修改
    configurable: false//是否可配置  delete obj.age;
});
console.log(obj.age);
obj.age = 10;
console.log(obj.age);
*/
function logger(target, key, descriptor) {
    let oldVal = descriptor.value;//获取老函数
    descriptor.value = function () {
        console.log(`${key}(${Array.from(arguments).join(',')}))`);
        return oldVal.apply(this, arguments);
    }
}
class Calculator {
    //@logger
    add(a, b) {
        return a + b;
    }
}
logger(Calculator.prototype, 'add', Object.getOwnPropertyDescriptor(Calculator.prototype, 'add'));
let c1 = new Calculator();
console.log(Calculator.prototype.add);
let ret = c1.add(1, 2);// add(1,2)
console.log(ret);