let { AsyncParallelHook } = require('tapable');
//异步的并行执行
class AsyncParallelHook1 {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        return Promise.all(this.tasks.map(task => task(...args)));
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1);
            resolve();
        }, 1000);
    });
});
queue.tapPromise('2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2);
            resolve();
        }, 2000);
    });
});
queue.tapPromise('3', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3);
            resolve();
        }, 3000);
    });
});
queue.promise('zfpx').then(function (err) {
    console.log(err);
    console.timeEnd('cost');
});