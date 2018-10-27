import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//props = {path,component} rest={path}
//router 渲染组件有三种方式 component render children
export default function ({ render, ...rest }) {
    return <Route  {...rest} render={(props) => localStorage.getItem('login') ? render(props) : <Redirect to="/login" />} />
}