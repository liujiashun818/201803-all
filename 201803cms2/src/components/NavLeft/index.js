
import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component {
    render() {
        return (
            <Menu
                style={{ height: 'calc(100vh - 138px)' }}
                theme="dark"
                defaultOpenKeys={["/admin/permission"]}
                defaultSelectedKeys={["/admin/users"]}
                mode="inline"
            >
                <SubMenu key="/admin/permission" title={<span><Icon type="bars" />权限管理</span>}>
                    <MenuItem key="/admin/users">
                        <Link to="/admin/users"><Icon type="user" />用户管理</Link>
                    </MenuItem>
                    <MenuItem key="/admin/roles">
                        <Link to="/admin/roles"><Icon type="idcard" />角色管理</Link>
                    </MenuItem>
                    <MenuItem key="/admin/resources">
                        <Link to="/admin/resources"><Icon type="wallet" />资源管理</Link>
                    </MenuItem>
                </SubMenu>
            </Menu>
        )
    }
}