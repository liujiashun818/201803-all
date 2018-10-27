import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Users extends Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }
    state = {

    }
    //当页码发生变化的时候执行回调，传过来新的页码current
    pageChangeHandler = (current) => {
        this.props.dispatch({
            type: 'users/list',
            payload: current
        });
    }
    startAdd = () => {
        this.props.dispatch({
            type: 'users/changeEditModal',
            payload: {
                record: {},
                isCreate: true,
                showEditModal: true
            }
        });
    }
    startEdit = (record) => {
        this.props.dispatch({
            type: 'users/changeEditModal',
            payload: {
                record,
                isCreate: false,
                showEditModal: true
            }
        });
    }
    handleEditModalOk = () => {
        this.editModal.props.form.validateFields((err, values) => {
            if (err) {
                message.warning('输入不合法，请检查输入!');
            } else {
                this.props.dispatch({
                    type: this.props.isCreate ? 'users/create' : 'users/update',
                    payload: values
                });
            }
        });
    }
    handleEditModalCanel = () => {
        this.props.dispatch({
            type: 'users/changeEditModal',
            payload: {
                record: {},
                isCreate: true,
                showEditModal: false
            }
        });
    }
    handleDelete = (id) => {
        this.props.dispatch({
            type: 'users/remove',
            payload: id
        });
    }
    delMulti = () => {
        this.props.dispatch({
            type: 'users/delMulti'
        });
    }
    handleSearch = (event) => {
        event.preventDefault();
        //得到用户输入的搜索的条件
        let conditions = this.searchForm.props.form.getFieldsValue();
        Object.keys(conditions).forEach(key => {
            if (!conditions[key]) {
                delete conditions[key];
            }
        });
        this.props.dispatch({
            type: 'users/search',
            payload: conditions
        });
    }
    render() {
        const columns = [
            {
                key: 'username',
                dataIndex: 'username',
                title: '用户名'
            },
            {
                key: 'email',
                dataIndex: 'email',
                title: '邮箱'
            },
            {
                key: 'phone',
                dataIndex: 'phone',
                title: '电话'
            },
            {
                key: 'gender',
                dataIndex: 'gender',
                title: '性别',
                render: (val, record, index) => {
                    return val ? '男' : '女';
                }
            },
            {
                key: 'operation',
                title: '操作',
                render: (val, record, index) => (
                    <ButtonGroup>
                        <Button icon="edit" onClick={() => this.startEdit(record)}>编辑</Button>
                        <Popconfirm title="你确定要删除吗?" onConfirm={() => this.handleDelete(record.id)}>
                            <Button style={{ marginLeft: 10 }} icon="delete">删除</Button>
                        </Popconfirm>
                    </ButtonGroup>
                )
            }
        ]
        const { list: dataSource, total, current,
            pageSize, loading, showEditModal,
            record, errorInfo, isCreate,
            selectedRowKeys } = this.props;
        //把每个对象的ID属性作为key属性
        //dataSource.forEach(item => item.key = item.id);
        const pagination = {
            total,//总条数
            current,//当前是第几页
            pageSize,//每页有多少条数据
            onChange: this.pageChangeHandler,//当点击其它页面的时候要执行回调加载其它页的数据
            showQuickJumper: true,//是否显示快速跳转功能
            showTotal: (total) => `总计${total}条`//显示总共多少条
        }
        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys,//用来控制哪些行被选中了
            //selectedRowKeys 是选中行key的数组
            onChange: (selectedRowKeys, selectedRows) => {
                this.props.dispatch({
                    type: 'users/changeUsers',
                    payload: { selectedRowKeys }
                });
            }
        }
        return (
            <Wrapper>
                <Card>
                    <SearchForm
                        wrappedComponentRef={inst => this.searchForm = inst}
                        handleSearch={this.handleSearch}
                    />
                </Card>
                <Card>
                    <ButtonGroup>
                        <Button icon="plus" type="dashed" onClick={this.startAdd}>添加</Button>
                        <Popconfirm title="你确定要删除吗?" onConfirm={this.delMulti}>
                            <Button style={{ marginLeft: 10 }} icon="delete" type="danger">全部删除</Button>
                        </Popconfirm>

                    </ButtonGroup>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={pagination}
                        loading={loading}
                        rowSelection={rowSelection}
                        rowKey="id"
                    />
                    <WrappedEditModal
                        showEditModal={showEditModal}
                        errorInfo={errorInfo}
                        record={record}
                        isCreate={isCreate}
                        handleEditModalCanel={this.handleEditModalCanel}
                        handleEditModalOk={this.handleEditModalOk}
                        wrappedComponentRef={inst => this.editModal = inst}
                    />
                </Card>
            </Wrapper>
        )
    }
}
class SearchForm extends Component {
    render() {
        let { form: { getFieldDecorator }, handleSearch } = this.props;
        return (
            <Form layout="inline" onSubmit={handleSearch}>
                <Form.Item>
                    {
                        getFieldDecorator('username')(
                            <Input placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('email')(
                            <Input placeholder="请输入邮箱" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('phone')(
                            <Input placeholder="请输入手机号" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button icon="search" htmlType="submit" shape="circle"></Button>
                </Form.Item>
            </Form>
        )
    }
}
SearchForm = Form.create()(SearchForm);
class EditModal extends Component {
    render() {
        const { showEditModal, handleEditModalOk, handleEditModalCanel, errorInfo, record, isCreate } = this.props;
        const { form: { getFieldDecorator } } = this.props;
        const FormItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        }
        return (
            <Modal
                title={isCreate ? "添加用户" : "编辑用户"}
                visible={showEditModal}
                destroyOnClose
                onCancel={handleEditModalCanel}
                onOk={handleEditModalOk}
            >
                <Form>
                    <FormItem label="用户名" {...FormItemLayout}>
                        {
                            getFieldDecorator('id', {
                                initialValue: record.id
                            })(<Input type="hidden" />)
                        }
                        {
                            getFieldDecorator('username', {
                                initialValue: record.username,
                                rules: [{ required: true, message: '请输入用户名' }]
                            })(<Input placeholder="用户名" />)
                        }
                    </FormItem>
                    <FormItem label="密码"  {...FormItemLayout}>
                        {
                            getFieldDecorator('password', {
                                initialValue: record.password,
                                rules: [{ required: true, message: '请输入密码' }]
                            })(<Input type="password" placeholder="密码" />)
                        }
                    </FormItem>
                    <FormItem label="邮箱"  {...FormItemLayout}>
                        {
                            getFieldDecorator('email', {
                                initialValue: record.email,
                                rules: [{ required: true, message: '请输入邮箱' },
                                { type: 'email', message: '必须输入合法的邮箱格式' }
                                ]
                            })(<Input placeholder="邮箱" />)
                        }
                    </FormItem>
                    <FormItem
                        {...FormItemLayout}
                        label="性别"
                    >
                        {getFieldDecorator('gender', {
                            initialValue: record.gender
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem label="手机号"  {...FormItemLayout}>
                        {
                            getFieldDecorator('phone', {
                                initialValue: record.phone,
                                rules: [{ required: true, message: '请输入手机号' }]
                            })(<Input placeholder="手机号" />)
                        }
                    </FormItem>
                    {
                        errorInfo && <FormItem>
                            <Alert style={{ textAlign: 'center' }} message={errorInfo} type="error" />
                        </FormItem>
                    }
                </Form>
            </Modal>
        )
    }
}
const WrappedEditModal = Form.create()(EditModal);

const Wrapper = styled.div`
  padding:20px;
`
export default connect(
    state => ({ ...state.users, loading: state.loading.models.users })
)(Users);