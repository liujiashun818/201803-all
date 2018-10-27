import React, { Component, Fragment } from 'react';
import { Transfer, Tree, Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
export default class SetResourcesModal extends Component {
    //children 就是我们的topMenus
    renderTreeNode = (children) => {
        return children.map(item => {
            if (item.children.length > 0) {
                return (
                    <TreeNode title={item.name} key={item.id}>
                        {this.renderTreeNode(item.children)}
                    </TreeNode>
                )
            } else {
                return <TreeNode title={item.name} key={item.id} />
            }
        });
    }
    render() {
        let { visible, errorInfo, record, onOk, onCancel, resources, checkedKeys, targetKeys, onCheck } = this.props;
        return (
            <Modal
                visible={visible}
                title='为角色分配资源'
                onOk={onOk}
                onCancel={onCancel}
            >
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                >
                    <TreeNode title="系统权限" key={0} disabled>
                        {
                            this.renderTreeNode(resources)
                        }
                    </TreeNode>
                </Tree>
            </Modal>
        )
    }
}