import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// 解决的是跨组件传递数据
let Context = React.createContext(); // 16 版本以上使用
class Parent extends Component{
    constructor(){
        super();
   }
   render(){
     return (<Context.Provider value={{color:'green',food:'食物'}}>
        <div>
          儿子<Son></Son>
        </div>
      </Context.Provider>)
 }
}
class Son extends Component {
  constructor() {
    super();
  }
  render() {
    return (<Context.Consumer>
     {(context)=>{
        return <div>孙子{context.food} <Grandson></Grandson></div>
    }}
    </Context.Consumer>)
  }
}
class Grandson extends Component {
  constructor() {
    super();
  }
  render() {
    return (<Context.Consumer>
      {(context)=>{
        return <div>重孙 {context.color}</div>
      }}
    </Context.Consumer>)
  }
}
ReactDOM.render(<Parent></Parent>,window.root)