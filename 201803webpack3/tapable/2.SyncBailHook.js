//let { SyncBailHook } = require('tapable');
//SyncHook Emitter  events 发布订阅模式 
class SyncBailHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        //this.tasks.forEach(task => task(...args));
        /*  for (let i = 0; i < this.tasks.length; i++) {
             let task = this.tasks[i];
             let ret = task(...args);
             if (ret) break;
         } */
        let ret, task;
        do {
            task = this.tasks.shift();
            if (task) ret = task(...args);
        } while (task && !ret);
    }
}
//SyncHook是不关心监听函数返回值的
//SyncBailHook 如果有一个返回不为null的值，则会停止后面所有监听函数执行
let queue = new SyncBailHook(['name', 'age']);
//tap的第一个参数没有用到，对程序远行没有用，但是可以给看源码的有用。
queue.tap('这是一个监听函数1', (name, age) => {
    console.log(name, age, '1');
    return 'wrong';
});
queue.tap('2', (name, age) => {
    console.log(name, age, '2');
});
queue.tap('3', (name, age) => {
    console.log(name, age, '3');
});
queue.call('zfpx', 9);