import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';

class Store {
    @observable number = 0;
    @action.bound add() {
        this.number = this.number + 1;
    }
}
@observer
class Counter extends Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                <p>{store.number}</p>
                <button onClick={store.add}>+</button>
            </div>
        )
    }
}
let store = new Store();
//store.add = store.add.bind(store);
ReactDOM.render(<Counter store={store} />, document.querySelector('#root'));