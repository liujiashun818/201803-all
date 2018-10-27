import React, { Component } from 'react';
import PureComponent from './PureComponent';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Counter from './Counter';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(<Provider store={store}><Counter /></Provider>, document.querySelector('#root'));