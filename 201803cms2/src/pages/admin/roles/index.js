import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Transfer, Tree, Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
import EditModal from './components/EditModal';
import SearchForm from './components/SearchForm';
import SetResourcesModal from './components/SetResourcesModal';
import SetUsersModal from './components/SetUsersModal';
import actions from './constants';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
const ENTITY = 'roles';
class Base extends Component {
    constructor(props) {
        super(props);
        this.dispatch = (type, payload) => {
            props.dispatch({
                type,
                payload
            });
        }
    }
    //当页码发生变化的时候执行回调，传过来新的页码current
    pageChangeHandler = (current) => {
        this.props.getList(current);
    }
    startAdd = () => {
        this.props.changeState({
            record: {},
            isCreate: true,
            showEditModal: true
        });
    }
    startEdit = (record) => {
        this.props.changeState({
            record,
            isCreate: false,
            showEditModal: true
        });
    }
    handleEditModalOk = () => {
        this.editModal.props.form.validateFields((err, values) => {
            if (err) {
                message.warning('输入不合法，请检查输入!');
            } else {
                if (this.props.isCreate) {
                    this.props.create(values);
                } else {
                    this.props.update(values);
                }
            }
        });
    }
    handleEditModalCanel = () => {
        this.props.changeState({
            record: {},
            isCreate: true,
            showEditModal: false
        });
    }
    handleDelete = (id) => {
        this.props.remove(id);
    }
    delMulti = () => {
        this.props.delMulti();
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

        this.props.search(conditions);
    }
    //开始给角色分配资源
    startSetResources = () => {
        if (this.props.selectedRowKeys.length > 0) {
            this.props.changeState({ showSetResources: true });
        } else {
            message.warn('请至少选择一个角色');
        }

    }
    handleSetResourcesCancel = () => {
        this.props.changeState({ showSetResources: false });
    }
    onCheck = (checkedKeys) => {
        this.props.changeState({ checkedKeys });
    }
    //处理设置权限的功能
    handleSetResourcesOk = () => {
        this.props.confirmSetResources();

    }
    //开始给角色分配用户，或者说给用户分配角色
    startSetUsers = () => {
        if (this.props.selectedRowKeys.length > 0) {
            this.props.changeState({ showSetUsers: true });
        } else {
            message.warn('请至少选择一个角色');
        }
    }
    handleSetUsersCancel = () => {
        this.props.changeState({ showSetUsers: false });
    }
    onSetUserChange = (targetKeys) => {
        this.props.changeState({ targetKeys });
    }
    handleSetUsersOk = () => {
        this.props.confirmSetUsers();
    }
    render() {
        const columns = [
            {
                key: 'name',
                dataIndex: 'name',
                title: '角色名'
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
            showSetUsers, users, changeState,
            selectedRowKeys, showSetResources, resources, checkedKeys, targetKeys } = this.props;
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
            type: 'radio',
            selectedRowKeys,//用来控制哪些行被选中了
            //selectedRowKeys 是选中行key的数组
            onChange: (selectedRowKeys, selectedRows) => {
                changeState({
                    selectedRowKeys,
                    checkedKeys: selectedRows[0].resourceIds,
                    record: selectedRows[0],
                    targetKeys: selectedRows[0].userIds,
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
                        <Button style={{ marginLeft: 10 }} icon="wallet" type="dashed" onClick={this.startSetResources}>分配权限</Button>
                        <Button style={{ marginLeft: 10 }} icon="wallet" type="dashed" onClick={this.startSetUsers}>分配用户</Button>
                    </ButtonGroup>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={pagination}
                        loading={loading}
                        rowSelection={rowSelection}
                        rowKey="id"
                        onRow={
                            (record) => (
                                {
                                    onClick: () => {
                                        // this.props.changeState({
                                        //     selectedRowKeys: [record.id],
                                        //     checkedKeys: record.resourceIds,
                                        //     targetKeys: record.userIds,
                                        //     record
                                        // });
                                    }
                                }
                            )
                        }
                    />
                    <EditModal
                        showEditModal={showEditModal}
                        errorInfo={errorInfo}
                        record={record}
                        isCreate={isCreate}
                        handleEditModalCanel={this.handleEditModalCanel}
                        handleEditModalOk={this.handleEditModalOk}
                        wrappedComponentRef={inst => this.editModal = inst}
                    />
                    <SetResourcesModal
                        visible={showSetResources}
                        errorInfo={errorInfo}
                        record={record}
                        resources={resources}
                        onCancel={this.handleSetResourcesCancel}
                        onOk={this.handleSetResourcesOk}
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}
                    />
                    <SetUsersModal
                        visible={showSetUsers}
                        errorInfo={errorInfo}
                        record={record}
                        users={users}
                        onCancel={this.handleSetUsersCancel}
                        onOk={this.handleSetUsersOk}
                        targetKeys={targetKeys}
                        onChange={this.onSetUserChange}
                    />
                </Card>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 20px;
`
export default connect(
    state => ({ ...state[ENTITY], loading: state.loading.models[ENTITY] }),
    actions
)(Base);