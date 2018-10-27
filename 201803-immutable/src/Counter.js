//组件的优化的原理是重写了shouldComponentUpdate，如果说老的状态对象和新的状态对象不是一个对象话才会刷新
/**
 * 1. 每次一定都要生成新的对象 深克隆是非常消耗内存的。
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
class Counter extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <input ref={input => this.amount = input} />
                <button onClick={() => this.props.add(1)}>+</button>
            </div>
        )
    }
}
let actions = {
    add(payload) {
        return { type: "ADD", payload };
    }
}
// let actions2 = {
//     add(payload) {
//         dispatch({ type: "ADD", payload });
//     }
// }
//state是合并后的state,应该也是一个immutable对象
export default connect(
    state => ({ number: state.getIn(['counter', 'number']) }),
    actions
)(Counter);