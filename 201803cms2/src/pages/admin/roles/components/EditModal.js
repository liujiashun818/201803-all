import React, { Component, Fragment } from 'react';
import { Transfer, Tree, Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
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
export default Form.create()(EditModal);