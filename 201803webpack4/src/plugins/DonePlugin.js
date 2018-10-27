
const {SyncHook}  = require('tapable')
class DonePlugin {
    constructor(options) {
        this.options = options;
        this.hooks = {
            show:new SyncHook()
        }
    }
    apply(compiler) {
        console.log('开始挂载DonePlugin');
        this.hooks.show.tap('监听我自己的show事件',()=>{
            console.log('DonePlugin自己的show事件触发了');
        });
        compiler.hooks.done.tapAsync('DonePlugin',(stats,cb)=>{
            compiler.start = Date.now();
            setTimeout(()=>{
                console.log('DONE事件已经触发');
                cb();
                this.hooks.show.call();
            },3000)
        });
    }
}
module.exports = DonePlugin;