import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const ENTITY = 'resources';
class Base extends Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }
    state = {

    }
    //当页码发生变化的时候执行回调，传过来新的页码current
    pageChangeHandler = (current) => {
        this.props.dispatch({
            type: `${ENTITY}/list`,
            payload: current
        });
    }
    startAdd = () => {
        this.props.dispatch({
            type: `${ENTITY}/changeEditModal`,
            payload: {
                record: {},
                isCreate: true,
                showEditModal: true
            }
        });
    }
    startEdit = (record) => {
        this.props.dispatch({
            type: `${ENTITY}/changeEditModal`,
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
                    type: this.props.isCreate ? `${ENTITY}/create` : `${ENTITY}/update`,
                    payload: values
                });
            }
        });
    }
    handleEditModalCanel = () => {
        this.props.dispatch({
            type: `${ENTITY}/changeEditModal`,
            payload: {
                record: {},
                isCreate: true,
                showEditModal: false
            }
        });
    }
    handleDelete = (id) => {
        this.props.dispatch({
            type: `${ENTITY}/remove`,
            payload: id
        });
    }
    delMulti = () => {
        this.props.dispatch({
            type: `${ENTITY}/delMulti`
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
            type: `${ENTITY}/search`,
            payload: conditions
        });
    }
    render() {
        const columns = [
            {
                key: 'name',
                dataIndex: 'name',
                title: '角色名'
            },
            {
                key: 'key',
                dataIndex: 'key',
                title: '路径'
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
                    type: `${ENTITY}/changeState`,
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
                        getFieldDecorator('name')(
                            <Input placeholder="请输入名称" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('key')(
                            <Input placeholder="请输入标识" />
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
                title={isCreate ? "添加" : "编辑"}
                visible={showEditModal}
                destroyOnClose
                onCancel={handleEditModalCanel}
                onOk={handleEditModalOk}
            >
                <Form>
                    <FormItem label="名称" {...FormItemLayout}>
                        {
                            getFieldDecorator('id', {
                                initialValue: record.id
                            })(<Input type="hidden" />)
                        }
                        {
                            getFieldDecorator('name', {
                                initialValue: record.username,
                                rules: [{ required: true, message: '请输入名称' }]
                            })(<Input placeholder="名称" />)
                        }
                    </FormItem>
                    <FormItem label="路径" {...FormItemLayout}>
                        {
                            getFieldDecorator('key', {
                                initialValue: record.username,
                                rules: [{ required: true, message: '请输入路径' }]
                            })(<Input placeholder="路径" />)
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
  padding: 20px;
`
export default connect(
    state => ({ ...state[ENTITY], loading: state.loading.models[ENTITY] })
)(Base);