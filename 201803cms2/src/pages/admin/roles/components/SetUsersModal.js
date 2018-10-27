import React, { Component, Fragment } from 'react';
import { Transfer, Tree, Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
export default class SetUsersModal extends Component {
    render() {
        let { visible, errorInfo, record, onOk, onCancel, users, targetKeys, onChange } = this.props;
        users.forEach(user => { user.key = user.id });
        return (
            <Modal
                visible={visible}
                title='为角色分配用户'
                destroyOnClose
                onOk={onOk}
                onCancel={onCancel}
            >
                <Transfer
                    dataSource={users}
                    title={["待选用户", "已选用户"]}
                    targetKeys={targetKeys}
                    onChange={onChange}
                    render={item => item.username}
                />
            </Modal>
        )
    }
}