import React,{Component} from 'react';
import {render} from 'react-dom';
// 非受控组件
// 不受状态控制 获取数据相当于就是操作dom，很容易和第三方库结合

// 两种 ref 引用 可以让我们操作dom
// 1.函数
// 2.通过构造函数声明的方式
class Control extends Component{
  constructor(){
    super();
    this.yyy = React.createRef(); // 16.3api createRef
  }
  handleSumbit=(e)=>{
    e.preventDefault();
    // 要取到current属性才是真实的DOM
    console.log(this.xxx.value)
    console.log(this.yyy.current.value);
  }
  render(){
    return (
      <form onSubmit={this.handleSumbit}>
        用户名:<input 
                name="username"
                type="text"
                ref={xxx => this.xxx = xxx} 
                /> <br/>
        密码:<input 
                type="text"
                name="password"
                ref={this.yyy}
                />
            <input type="submit"/>
      </form>
    )
  }
}
render(<Control></Control>,window.root);
