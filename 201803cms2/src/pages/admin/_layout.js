import React, { Component } from 'react';
import { Layout } from 'antd';
import NavHeader from '../../components/NavHeader';
import NavLeft from '../../components/NavLeft';
const { Header, Sider, Content, Footer } = Layout;
export default class Admin extends Component {
    render() {
        return (
            <Layout>
                <NavHeader />
                <Layout >
                    <Sider>
                        <NavLeft />
                    </Sider>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    珠峰培训 @2018
                </Footer>
            </Layout>
        )
    }
}