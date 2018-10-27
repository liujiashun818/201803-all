//let { SyncHook } = require('tapable');
//SyncHook Emitter  events 发布订阅模式 
class SyncHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}
let queue = new SyncHook(['name', 'age']);
//tap的第一个参数没有用到，对程序远行没有用，但是可以给看源码的有用。
queue.tap('这是一个监听函数1', (name, age) => {
    console.log(name, age, '1');
});
queue.tap('2', (name, age) => {
    console.log(name, age, '2');
});
queue.tap('3', (name, age) => {
    console.log(name, age, '3');
});
queue.call('zfpx', 9);