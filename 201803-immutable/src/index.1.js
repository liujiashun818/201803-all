import React, { Component } from 'react';
import PureComponent from './PureComponent';
import _ from 'lodash';
import ReactDOM from 'react-dom';
//组件的优化的原理是重写了shouldComponentUpdate，如果说老的状态对象和新的状态对象不是一个对象话才会刷新
/**
 * 1. 每次一定都要生成新的对象 深克隆是非常消耗内存的。
 */
class Counter extends PureComponent {
    state = {
        counter: { number: 0 }
    }
    handleClick = (event) => {
        let state = _.cloneDeep(this.state);
        let amount = this.amount.value ? Number(this.amount.value) : 0;
        state.counter.number = state.counter.number + amount;
        this.setState(state);
    }
    render() {
        console.log('render');
        return (
            <div>
                <p>{this.state.counter.number}</p>
                <input ref={input => this.amount = input} />
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
ReactDOM.render(<Counter />, document.querySelector('#root'));