import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed, trace, observe, toJS } from 'mobx';
import { observer } from 'mobx-react';

class Todo {
    id = Math.random();
    @observable text = '';
    @observable completed = false;
    constructor(text, completed = false) {
        this.text = text;
    }
    //切换完成状态 
    @action.bound toggle() {
        this.completed = !this.completed;
    }
}
class Store {
    @observable todos = [];
    @action.bound load(todos) {
        todos.forEach(todo => {
            this.todos.push(new Todo(todo.text, todo.completed));
        });
    }
    cancelObserves = [];
    constructor() {
        observe(this.todos, (event) => {
            console.log('event', event);
            this.save();
            this.cancelObserves.forEach(d => d());
            this.cancelObserves = [];
            for (let todo of event.object) {
                this.cancelObserves.push(observe(todo, this.save));
            }
        });
    }
    @action.bound save() {
        let todos = toJS(this.todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    @observable filter = 'all';
    @action.bound changeFilter(filter) {
        this.filter = filter;
    }
    @action.bound addTodo(text) {
        //redux thunk redux-priomise redux-saga
        window.setTimeout(() => {
            this.todos.push(new Todo(text));
        }, 1000)
    }
    @action.bound removeTodo(todo) {
        this.todos.remove(todo);
    }
    @computed get filteredTodos() {
        return this.todos.filter(todo => {
            switch (this.filter) {
                case 'completed':
                    return todo.completed;
                case 'uncompleted':
                    return !todo.completed;
                default:
                    return true;
            }
        });
    }
    @computed get reminder() {
        return this.todos.reduce((count, todo) => {
            count = count + (todo.completed ? 0 : 1);
            return count;
        }, 0);
    }
}
let store = new Store();
@observer
class TodoItem extends Component {
    render() {
        return (
            <React.Fragment>
                <input type="checkbox"
                    onChange={this.props.todo.toggle}
                    checked={this.props.todo.completed} />
                <span style={{ textDecoration: this.props.todo.completed ? 'line-through' : '' }}>{this.props.todo.text}</span>
            </React.Fragment>
        )
    }
}
@observer
class TodoHeader extends Component {
    state = {
        text: ""
    }
    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let text = this.state.text;
        this.props.store.addTodo(text);
        this.setState({ text: '' });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    onChange={this.handleChange}
                    value={this.state.text} />
            </form>
        )
    }
}
@observer
class TodoItems extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.store.filteredTodos.map(todo => (
                        <li key={todo.id}>
                            <TodoItem todo={todo} />
                            <span onClick={() => store.removeTodo(todo)}>X</span>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
@observer
class TodoFooter extends Component {
    render() {
        let store = this.props.store;
        return (
            <div>
                <p>你还有{store.reminder}件待办事项</p>
                <p>
                    <button
                        onClick={() => store.changeFilter('all')}
                        style={{ color: store.filter == 'all' ? 'red' : 'black' }}
                    >全部</button>
                    <button
                        onClick={() => store.changeFilter('uncompleted')}
                        style={{ color: store.filter == 'uncompleted' ? 'red' : 'black' }}
                    >未完成</button>
                    <button
                        onClick={() => store.changeFilter('completed')}
                        style={{ color: store.filter == 'completed' ? 'red' : 'black' }}
                    >已完成</button>
                </p>
            </div>
        )
    }
}
@observer
class Todos extends Component {
    componentDidMount() {
        let todosStr = localStorage.getItem('todos');
        let todos = todosStr ? JSON.parse(todosStr) : [];
        this.props.store.load(todos);
    }
    render() {
        let store = this.props.store;
        return (
            <div>
                <TodoHeader store={store} />
                <TodoItems store={store} />
                <TodoFooter store={store} />
            </div>
        )
    }
}
ReactDOM.render(<Todos store={store} />, document.querySelector('#root'));