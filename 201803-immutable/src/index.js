import React, { Component } from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createHistory from "history/createBrowserHistory";
import { Router, Route } from "react-router";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    //ConnectedRouter,
    //routerReducer,
    //routerMiddleware,
    //push
} from "react-router-redux";
const LOCATION_CHANGE = 'LOCATION_CHANGE';
class ConnectedRouter extends Component {
    static contextTypes = {
        store: PropTypes.object
    }
    //连接仓库和路由,监听路由变化，当路径发生变化的时候派发动作
    componentWillMount() {
        this.store = this.context.store;
        //window.addEventListener('hashchange',()=>{})
        //window.addEventListener('pushState',()=>{})
        //history是一个封装，让hashhistory 和browerhistory使用相同的api
        this.props.history.listen(location => {
            this.store.dispatch({
                type: LOCATION_CHANGE,
                location
            });
        });
    }
    render() {
        return <Router {...this.props} />
    }
}
let initRouterState = { location: {} };
function routerReducer(state = initRouterState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return { ...state, location: action.location };
        default:
            return state;
    }
    return state;
}
const CHANGE_LOCATION = 'CHANGE_LOCATION';
function push(pathname) {
    return {
        type: CHANGE_LOCATION,
        pathname
    }
}
function routerMiddleware(history) {
    return function ({ getState, dispatch }) {
        return function (next) {
            return function (action) {
                if (action.type == CHANGE_LOCATION) {
                    history.push(action.pathname);
                } else {
                    next(action);
                }
            }
        }
    }
}
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(middleware)
);
let Home = () => <div>Home</div>
let About = () => <div>About</div>
let Topics = () => <div>Topics</div>
// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))
window.store = store;
window.push = push;
ReactDOM.render(
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <div>
                <Link to="/about">about</Link>
                <Link to="/topics">topics</Link>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);