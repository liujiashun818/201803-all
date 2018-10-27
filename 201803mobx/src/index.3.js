let { observable, observe, computed, autorun, when, reaction, action,runInAction } = require('mobx');
class Person {
    @observable name = 'zfpx';
    @observable age = 10;
    @observable province = '广东';
    @observable city = '深圳';

    @observable area = '010';
    @observable number = '1899999999';

    @computed get home() {
        return this.province + '-' + this.city;
    }

    @computed get phone() {
        return this.area + '-' + this.number;
    }
    @action.bound switchPhone(area, number) {
        this.area = area;
        this.number = number;
    }
}
let p1 = new Person();
autorun(() => {
    console.log(p1.phone);
});
//p1.switchPhone('200', '300');
let s = p1.switchPhone;
s('200', '300');
runInAction(()=>{
    p1.name = 'zfpx2';
    p1.age = 100;
});
// let num = 1;
// let numObj = observable.box(num);
// numObj.observe(x => console.log(x));
// numObj.set(100);
// num = 2;




// let phone = computed(() => {
//     return "number:" + p1.area + '-' + p1.number;
// });
// phone.observe(c => console.log(c));
//自动运行,当系统启动之后自动运行此函数
// autorun(() => {
//     console.log("number:" + p1.phone);
// });


// setTimeout(() => {
//     p1.area = '202';
// }, 1000);
//when会等待条件满足，一旦满足就会执行回调并销毁监听
//会返回一个取消监听的函数，如果 调用它就直接取消监听
// let disposer = when(() => p1.age >= 11, () => {
//     console.log(p1.age);
// });
// disposer();
// setInterval(() => {
//     p1.age++;
// }, 1000);
//autorun
//监听数组中变量的变化 ，变化之后才执行回调函数
// reaction(() => [p1.age, p1.name], arr => {
//     console.log(arr);
// });
// p1.age = 11;
// p1.name = 'zfpx8';



// console.log(p1.phone, p1.home);
// observe(p1, c => console.log(c));
// p1.area = '020';
// p1.number = '15788888888';
/**
let phone = computed(() => {
    return p1.area + '-' + p1.number;
});
console.log(phone);
phone.observe(c => console.log(c));
p1.area = '200';
p1.number = '157';

let n1 = observable.box(1);
n1.observe(c => console.log(c));
n1.set(2);
 */