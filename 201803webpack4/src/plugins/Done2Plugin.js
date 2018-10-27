
class DonePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log('开始挂载DonePlugin');
        compiler.hooks.done.tapAsync('Done2Plugin',(stats,cb)=>{
            setTimeout(()=>{
                console.log('Done2 DONE事件已经触发');
                cb();
            },3000)
        });
    }
}
module.exports = DonePlugin;