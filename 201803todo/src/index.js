import React, { Component } from 'react';
import dva, { connect } from 'dva';
import { Router, Route, Switch, Link } from 'dva/router';
import immutable, { Map, fromJS } from 'immutable';
let todos = [{ id: 1, text: '1', completed: false }, { id: 2, text: '2', completed: true }];
let api = {
  load() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(todos);
      }, 1000);
    });
  },
  add(todo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        todos = [...todos, todo];
        resolve(todos);
      }, 1000);
    });
  },
  toggle(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        todos = todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
        resolve(todos);
      }, 1000);
    });
  },
  del(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        todos = todos.filter(item => item.id != id);
        resolve(todos);
      }, 1000);
    });
  }
}
// 1. 初始化
const app = dva();
/**
{
  filter:'all',
  todos:{
    list: [],//todos的数据
  }
}
*/
app.model({
  namespace: 'filter',
  state: 'all',
  reducers: {
    changeFilter(state, { filter }) {
      return filter;
    }
  }
});
// 2. Model
app.model({
  namespace: 'todos',
  state: fromJS({
    list: [],//todos的数据
  }),
  reducers: {
    loaded(state, { list }) {
      return fromJS({ list });
    }
  },
  // import effects from 'redux-saga/effects';
  effects: {
    *load(action, { call, put }) {
      let list = yield call(api.load);
      yield put({ type: 'loaded', list });
    },
    //切换ID对应的todo的完成状态
    *toggle({ id }, { put, call, select }) {
      let list = yield call(api.toggle, id);
      yield put({ type: 'loaded', list });
    },
    *del({ id }, { put, call }) {
      let list = yield call(api.del, id);
      yield put({ type: 'loaded', list });
    },
    *add({ todo }, { call, put }) {
      let list = yield call(api.add, todo);
      yield put({ type: 'loaded', list });
    }
  },
  //订阅 在这里我们监听当URL切换到/todos的时候，当切过来的时候调后台接口异步加载数据
  subscriptions: {
    //history操作历史  dispatch派发动作
    setup({ history, dispatch }) {
      //当浏览器路径发生变化的时候会执行此回调函数并传入location
      history.listen(({ pathname }) => {
        if (pathname == '/todos') {
          //如果我要执行异步任务的话肯定要把动作派发给effects
          dispatch({ type: 'load' });
        }
      });
    }
  }
});

class Todos extends Component {
  render() {
    let { list, toggle, add, changeFilter, filter, del } = this.props;
    return (
      <div>
        <input type="text" ref={input => this.text = input} />
        <button onClick={() => { add(this.text.value); this.text.value = '' }}>增加</button>
        <ul>
          {
            list.map(todo => (
              <li>
                <input type="checkbox"
                  onChange={() => toggle(todo.id)}
                  checked={todo.completed} />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                <button onClick={del.bind(this, todo.id)}>删除</button>
              </li>
            ))
          }
        </ul>
        <div>
          <button style={{ color: filter == 'uncompleted' && 'red' }} onClick={() => changeFilter('uncompleted')}>未完成</button>
          <button style={{ color: filter == 'completed' && 'red' }} onClick={() => changeFilter('completed')}>已完成</button>
          <button style={{ color: filter == 'all' && 'red' }} onClick={() => changeFilter('all')}>全部</button>
        </div>
      </div>
    )
  }
}
let actions = {
  toggle(id) {
    return { type: 'todos/toggle', id };
  },
  add(text) {
    return { type: 'todos/add', todo: { id: Date.now(), text, completed: false } };
  },
  changeFilter(filter) {
    return { type: 'filter/changeFilter', filter };
  },
  del(id) {
    return { type: 'todos/del', id };
  }
}
let WrappedTodos = connect(
  state => ({
    filter: state.filter,
    list: state.todos.get('list').filter(item => {
      switch (state.filter) {
        case 'completed':
          return item.completed;
        case 'uncompleted':
          return !item.completed;
        default:
          return true;
      }
    })
  }),
  actions
)(Todos);
// 3. Router
const HomePage = () => <div>Hello Dva.</div>;
//history是hashHistory和browserHistory的封装，是用来跳转路径的history.push() history.listen
app.router(({ history }) =>
  <Router history={history}>
    <div>
      <Link to="/">首页</Link>
      <Link to="/todos">todos</Link>
      <Switch>
        <Route exact path="/" exact component={HomePage} />
        <Route path="/todos" exact component={WrappedTodos} />
      </Switch>
    </div>
  </Router>
);

// 4. Start
app.start('#root');
