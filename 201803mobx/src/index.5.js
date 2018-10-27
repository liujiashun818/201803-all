import React, { Component } from 'react';
import { observable, action, observe, spy } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';
spy(event => console.log(event));
class Store {
    @observable todos = []
    disposers = [];//里面存放着所有的取消监听的函数
    constructor() {
        // observe(this.todos, event => {
        //     console.log(event);
        //     //让以前的所有取消监听函数执行
        //     this.disposers.forEach(disposer => disposer());
        //     this.disposers = [];
        //     for (let todo of event.object) {
        //         let disposer = observe(todo, e => {
        //             console.log(e);
        //         });
        //         this.disposers.push(disposer);
        //     }
        // });
    }
}
let store = new Store();
store.todos.push({ id: 1, name: 'zfpx1' });
store.todos.push({ id: 2, name: 'zfpx2' });
store.todos.get(0).name = 'zfpx3';
//console.log(store.todos.get(0));


/**
@observer
class Todos extends Component {
    render() {
        let store = this.props.store;
        return (
            <div>

            </div>
        )
    }
}
let store = new Store();
//store.add = store.add.bind(store);
ReactDOM.render(<Todos store={store} />, document.querySelector('#root'));
 */