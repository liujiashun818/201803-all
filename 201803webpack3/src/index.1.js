import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Lazy from './Lazy';
function render() {
    ReactDOM.render(
        <Router>
            <Fragment>
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Route path="/home" component={Home} />
                <Route path="/about" render={
                    //location match history
                    props => <Lazy {...props} load={() => import('./About')} />
                } />

            </Fragment>
        </Router>,
        document.querySelector('#root')
    );
}
render();
if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept(() => {
            render();
        });
    }
}
