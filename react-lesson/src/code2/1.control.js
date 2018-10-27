import React,{Component} from 'react';
import {render} from 'react-dom';

// 双向绑定
// 受控组件一般应用再 表单需要默认值 实时映射到状态的时候 可能会需要用到这种方式，在输入的时候 可以验证合法性
class Control extends Component{
  state = {
    username:'zfpx',
    password:'12345678'
  }
  handleChange = (e)=>{
    let name = e.target.name
    this.setState({
      [name]:e.target.value
    })
  }
  render(){
    return (
      <div>
        用户名:<input 
                name="username"
                type="text" 
                value={this.state.username} 
                onChange={this.handleChange}/> <br />
        密码:<input 
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}/>
      </div>
    )
  }
}
render(<Control></Control>,window.root)