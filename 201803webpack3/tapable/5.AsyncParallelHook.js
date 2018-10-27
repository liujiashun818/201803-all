//let { AsyncParallelHook } = require('tapable');
//异步的并行执行
class AsyncParallelHook {
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0;
        let done = () => {
            if (++index == this.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => task(...args, done));
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1', function (name, callback) {
    setTimeout(function () {
        console.log(1);
        callback();
    }, 1000);
});
queue.tapAsync('2', function (name, callback) {
    setTimeout(function () {
        console.log(2);
        callback();
    }, 2000);
});
queue.tapAsync('3', function (name, callback) {
    setTimeout(function () {
        console.log(3);
        callback();
    }, 3000);
});
queue.callAsync('zfpx', err => {
    console.log(err);
    console.timeEnd('cost');
});