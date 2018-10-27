let util = require('util');
class HtmlInlinePlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        compiler.hooks.compilation.tap('HtmlInlinePlugin',(compilation)=>{
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlInlinePlugin',(htmlData,cb)=>{
                //htmlData是一个对象，我们就是基于它生成的最终的html
                console.log(compilation.assets);
                htmlData.body = htmlData.body.map(tag=>{
                    if(tag.tagName == 'script'){
                        let newTag = {
                            tagName: 'script',
                            closeTag: true,
                            attributes: { type: 'text/javascript'}
                        }
                        newTag.innerHTML = compilation.assets[tag.attributes.src].source();
                        return newTag;
                    }else if(tag.tagName == 'link'){
                        let newTag = {
                            tagName: 'style',
                            closeTag: true,
                            attributes: { type: 'text/css'}
                        }
                        newTag.innerHTML =  compilation.assets[tag.attributes.href].source();
                        return newTag;
                    }
                    
                });
                cb();
            });
        });
    }
}
  /**
   *  {
                        tagName:'link',
                        closeTag:true,
                        attributes: { rel:"stylesheet", href: 'main.css' } 
                    }
                 * { tagName: 'script',
                     closeTag: true,
                     attributes: { type: 'text/javascript', src: 'main.js' } 
                    } 
                   
                 */
module.exports = HtmlInlinePlugin;