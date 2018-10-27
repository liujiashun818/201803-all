
class OptimizePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        console.log('开始挂载OptimizePlugin');

        compiler.hooks.compilation.tap('OptimizePlugin',(compilation)=>{
            compilation.hooks.optimize.tap('OptimizePlugin',()=>{
                console.log('监听到了compilation对象的optimize事件');
            });
        });
    }
}
module.exports = OptimizePlugin;