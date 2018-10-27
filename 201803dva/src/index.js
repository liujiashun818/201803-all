//connect react-redux
import React, { Component } from 'react';
import dva, { connect } from 'dva';
let app = dva();
// combineReducers({
//     counter:counter
// });
//状态state是合并后的状态树
// {
//     counter:{number:0}
// }
//配置模板
app.model({
    //命令空间，它就是以前的combineReducers里面的key
    namespace: 'counter',
    state: {
        highest: 0,//最大值
        current: 0//当前值
    },
    //这里可以定义子reducer，它可以而且只能由它来修改状态
    reducers: {
        //这个名字是有意义的，如果派发一个counter/add,就会执行此reducer
        increment(state, action) {
            let newCurrent = state.current + 1;
            return {
                ...state,
                current: newCurrent,
                highest: newCurrent > state.highest ? newCurrent : state.highest
            };
        },
        minus(state, action) {
            return { ...state, current: state.current - 1 };
        }
    },
    //这个对象里放的是副作用，放的是generator
    // effects = redux-saga/effects
    effects: {
        *increment(action, { call, put }) {
            //call表示调用一个异步任务
            yield call(delay, 1000);
            //在model里派发动作的话是不需要加counter或者说namespace前缀的
            yield put({ type: 'minus' });
        }
    }
});
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}
//记录一个当前值和最大值 记录一S能点多少次
function Counter({ highest, current, add }) {
    return (
        <div style={{ border: '1px solid red', textAlign: 'center', width: 200, height: 200, margin: '20px auto' }}>
            <p>最大值:{highest}</p>
            <p>当前值:{current}</p>
            <button onClick={add}>+</button>
        </div>
    )
}
let mapStateToProps = state => state.counter;
let actions = {
    add() {
        //dispatch({ type: 'counter/add' });
        return { type: 'counter/increment' };
    }
}
let ConnectedCounter = connect(
    mapStateToProps,
    actions
)(Counter);
//定义路由
app.router(({ history, app }) => (
    <ConnectedCounter />
));
app.start('#root');