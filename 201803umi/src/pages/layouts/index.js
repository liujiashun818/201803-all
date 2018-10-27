import React, { Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'umi/link';
import { TransitionGroup, CSSTransition } from "react-transition-group";
export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a href="#" className="navbar-brand">
                                管理管理
                            </a>
                        </div>
                        <div>
                            <ul className="nav navbar-nav">
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/user/list">用户管理</Link></li>
                                <li><Link to="/profile">个人设置</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <TransitionGroup>
                                <CSSTransition key={this.props.location.pathname} classNames="fade" timeout={300}>
                                    {this.props.children}
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}