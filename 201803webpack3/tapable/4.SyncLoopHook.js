//let { SyncLoopHook } = require('tapable');
//SyncHook Emitter  events 发布订阅模式 
class SyncLoopHook {
    constructor() {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args);
            } while (ret);
        });
    }
}

let queue = new SyncLoopHook(['name', 'age']);
let index = 0;
queue.tap('1', (name) => {
    console.log(index);
    if (index++ < 3) {
        return true;
    }
});
queue.call('zfpx');