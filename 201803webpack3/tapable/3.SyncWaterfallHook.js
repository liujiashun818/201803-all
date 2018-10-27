//let { SyncWaterfallHook } = require('tapable');
//SyncHook Emitter  events 发布订阅模式 
class SyncWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let first = this.tasks.shift();//取出第一个回调函数
        this.tasks.reduce((val, task) => task(val), first(...args));
    }
}
//SyncHook是不关心监听函数返回值的
//SyncBailHook 如果有一个返回不为null的值，则会停止后面所有监听函数执行
let queue = new SyncWaterfallHook(['name', 'age']);
//tap的第一个参数没有用到，对程序远行没有用，但是可以给看源码的有用。
queue.tap('1', (name, age) => {
    console.log(name, age, '1');
    return '1';
});
queue.tap('2', (data) => {
    console.log(data, '2');
    return 2;
});
queue.tap('3', (data) => {
    console.log(data, '3');
});
queue.call('zfpx', 9);