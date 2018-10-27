
class DonePlugin {
    constructor(options) {
        this.options = options;
       
    }
    apply(compiler) {
        console.log('开始挂载DonePlugin');
       
        compiler.hooks.done.tapAsync('Done3Plugin',(stats,cb)=>{
            setTimeout(()=>{
                console.log('Done3事件已经触发');
                cb();
                console.log((Date.now()- compiler.start)/1000);
            },3000)
        });
    }
}
module.exports = DonePlugin;