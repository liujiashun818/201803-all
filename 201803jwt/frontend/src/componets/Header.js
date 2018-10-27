import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import actions from '../store/actions/user';
class Header extends Component {
    componentDidMount() {
        //派发一个动作，我要从localStorage人仓库中加载token，再解出用户
        this.props.loadUser();
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">用户管理</a>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/">首页</Link></li>
                            {!this.props.user && <li><Link to="/users/signup">注册</Link></li>}
                            {!this.props.user && <li><Link to="/users/signin">登录</Link></li>}
                            {this.props.user && <li><Link to="/articles/add">发表文章</Link></li>}
                        </ul>
                        {
                            this.props.user && <ul className="nav navbar-nav navbar-right">
                                <li><a>欢迎你:{this.props.user.username}</a></li>
                                <li><a onClick={this.props.logout}>退出</a></li>
                            </ul>
                        }

                    </div>
                </div>
            </nav>
        )
    }
}

export default connect(
    state => state.user, actions
)(Header);