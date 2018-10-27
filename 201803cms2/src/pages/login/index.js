import React, { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Switch, Row, Col, Form, Input, Select, Alert, Radio, message, Layout, Button, Icon, Cascader, AutoComplete } from 'antd';
const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();//阻止默认事件，不要让页面刷新
        //先验证表单输入的值是否合法
        this.loginForm.props.form.validateFields((err, values) => {
            if (err) {
                message.warn('字段的输入不合法，请检查输入!');
            } else {
                this.props.dispatch({
                    type: this.props.isSignup ? 'login/signup' : 'login/login',
                    payload: values
                });
            }
        });
    }
    changeSignupStatus = () => {
        this.props.dispatch({
            type: 'login/changeSignupStatus'
        });
    }
    render() {
        return (
            <Layout>
                <Content>
                    <WrappedLoginForm
                        handleSubmit={this.handleSubmit}
                        wrappedComponentRef={instance => this.loginForm = instance}
                        isSignup={this.props.isSignup}
                        errorInfo={this.props.errorInfo}
                        changeSignupStatus={this.changeSignupStatus}
                    />
                </Content>
                <Footer>珠峰培训 @2018</Footer>
            </Layout>
        )
    }
}
class LoginForm extends Component {
    state = {
        confirmDirty: false,
        genderValue: 1,
        autoCompleteResult: []//这里存放的就是联想词的数据源
    }
    handleConfirmBlur = (event) => {
        let val = event.target.value;
        //一旦输入过了，这个值就是永远是脏的了
        this.setState({ confirmDirty: this.state.confirmDirty || !!val });
    }
    validateToNextPassword = (rule, val, callback) => {
        let form = this.props.form;
        //confirmDirty 如果为true就表示确认密码被用户输入过
        if (val && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    valideConfirmPassword = (rule, val, callback) => {
        let password = this.props.form.getFieldValue('password');
        if (val == password) {
            callback();
        } else {
            callback('密码和确认密码不匹配!');
        }

    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult = [];
        if (value) {
            autoCompleteResult = ['.com', '.cn', '.org'].map(domain => `${value}${domain}`);
        }
        // ['a.com','a.cn','a.org']
        this.setState({ autoCompleteResult });
    }
    captchaClick = (event) => {
        event.target.src = `http://localhost:7001/captcha?ts=` + Date.now();
    }
    handleGenderChange = (event) => {
        this.setState({ genderValue: event.target.value })
    }
    render() {
        const { form: { getFieldDecorator }, isSignup, errorInfo } = this.props;
        const FormItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        const addreses = [
            {
                label: '广东',
                value: 'guangdong',
                children: [
                    {
                        label: '广州',
                        value: 'guangzhou'
                    },
                    {
                        label: '东莞',
                        value: 'dongguan'
                    }
                ]
            },
            {
                label: '山东',
                value: 'shandong',
                children: [
                    {
                        label: '济南',
                        value: 'jinan'
                    },
                    {
                        label: '寿光',
                        value: 'shouguang'
                    }
                ]
            }
        ];
        const autoCompleteDataSource = this.state.autoCompleteResult.map(item => (
            <AutoCompleteOption key={item}>{item}</AutoCompleteOption>
        ));
        return (
            <WrappedForm>

                <Form onSubmit={this.props.handleSubmit} style={{ width: 500 }}>
                    <h3 style={{ textAlign: 'center' }}>欢迎{isSignup ? '注册' : '登录'}</h3>
                    <FormItem label="用户名" {...FormItemLayout}>
                        {
                            getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }]
                            })(<Input placeholder="用户名" />)
                        }
                    </FormItem>
                    <FormItem label="密码"  {...FormItemLayout}>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }, {
                                    validator: this.validateToNextPassword
                                }]
                            })(<Input type="password" placeholder="密码" />)
                        }
                    </FormItem>
                    {
                        isSignup && <FormItem label="确认密码"  {...FormItemLayout}>
                            {
                                getFieldDecorator('confirm', {
                                    rules: [{ required: true, message: '请输入确认密码' }, {
                                        validator: this.valideConfirmPassword
                                    }]
                                })(<Input type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />)
                            }
                        </FormItem>
                    }
                    {
                        isSignup && <FormItem label="邮箱"  {...FormItemLayout}>
                            {
                                getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入邮箱' },
                                    { type: 'email', message: '必须输入合法的邮箱格式' }
                                    ]
                                })(<Input placeholder="邮箱" />)
                            }
                        </FormItem>
                    }
                    {
                        isSignup &&
                        <FormItem
                            {...FormItemLayout}
                            label="婚否"
                        >
                            {getFieldDecorator('ismarried', { valuePropName: 'checked', initialValue: true })(
                                <Switch />
                            )}
                        </FormItem>
                    }
                    {
                        isSignup &&
                        <FormItem
                            {...FormItemLayout}
                            label="性别"
                        >
                            {getFieldDecorator('gender')(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    }
                    {
                        isSignup && <FormItem label="地址"  {...FormItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: ['guangdong', 'guangzhou'],
                                    rules: [{ required: true, message: '请输入地址' }]
                                })(<Cascader options={addreses} />)
                            }
                        </FormItem>
                    }
                    {
                        isSignup && <FormItem label="手机号"  {...FormItemLayout}>
                            {
                                getFieldDecorator('phone', {
                                    rules: [{ required: true, message: '请输入手机号' }]
                                })(<Input placeholder="手机号" />)
                            }
                        </FormItem>
                    }
                    {
                        isSignup && <FormItem label="个人主页"  {...FormItemLayout}>
                            {
                                getFieldDecorator('website', {
                                    rules: [{ required: true, message: '请输入个人主页' }]
                                })(
                                    <AutoComplete
                                        dataSource={autoCompleteDataSource}
                                        onChange={this.handleWebsiteChange}
                                        placeholder="请输入个人主页"
                                    >
                                        <Input />
                                    </AutoComplete>
                                )
                            }
                        </FormItem>
                    }
                    {
                        isSignup && <FormItem label="验证码"  {...FormItemLayout}>
                            <Row gutter={8}>
                                <Col span={12}>
                                    {
                                        getFieldDecorator('captcha', {
                                            rules: [{ required: true, message: '请输入验证码' }]
                                        })(<Input placeholder="验证码" />)
                                    }
                                </Col>
                                <Col span={12}>
                                    <img onClick={this.captchaClick} src="http://127.0.0.1:7001/captcha" />
                                </Col>
                            </Row>
                        </FormItem>
                    }

                    <FormItem>
                        <Button htmlType="submit" type="primary" style={{ width: '100%' }} >{isSignup ? '注册' : "登录"}</Button>
                        {isSignup ? '我有账号' : '我还没有账号'}
                        <a style={{ marginLeft: 10 }} href="#" onClick={this.props.changeSignupStatus}>{isSignup ? '立刻登录' : '立刻注册'}</a>
                    </FormItem>
                    {
                        errorInfo && <FormItem>
                            <Alert style={{ textAlign: 'center' }} message={errorInfo} type="error" />
                        </FormItem>
                    }
                </Form>
            </WrappedForm>
        )
    }
}
//为什么要包装呢？其实是一个高阶组件，是为了向LoginForm里传递一些属性，用来设置值和获取值
const WrappedLoginForm = Form.create({})(LoginForm);
let WrappedForm = styled.div`
     height:calc(100vh - 68px);
    display:flex;
    align-items: center;
    justify-content: center;
  
    form {
        padding:20px;
        border:1px solid #999;
        border-radius:5px;
        box-shadow: 1px 1px 2px 2px #999,-1px -1px 2px 2px #999;
    }
`
//react-redux
//state= store.getState() 得到的总状态对象，也就是合并后的状态 对象
export default connect(
    state => state.login
)(Login);
