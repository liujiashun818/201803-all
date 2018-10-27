import React, { Component } from 'react';
import PureComponent from './PureComponent';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
//组件的优化的原理是重写了shouldComponentUpdate，如果说老的状态对象和新的状态对象不是一个对象话才会刷新
/**
 * 1. 每次一定都要生成新的对象 深克隆是非常消耗内存的。
 */
class Counter extends PureComponent {
    state = {
        counter: Map({ number: 0 })
    }
    handleClick = (event) => {
        let amount = this.amount.value ? Number(this.amount.value) : 0;
        let state = { ...state, counter: this.state.counter.update('number', val => val + amount) }
        this.setState(state);
    }

    render() {
        console.log('render');
        return (
            <div>
                <p>{this.state.counter.get('number')}</p>
                <input ref={input => this.amount = input} />
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
function setState(newState) {
    if (shouldComponentUpdate(newState)) {
        render();
    }
}
ReactDOM.render(<Counter />, document.querySelector('#root'));