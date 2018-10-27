import React, { Component, Fragment } from 'react';
import { Transfer, Tree, Card, Table, Button, Radio, Input, Popconfirm, message, Icon, Alert, Modal, Form } from 'antd';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;
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
                    <Button icon="search" htmlType="submit" shape="circle"></Button>
                </Form.Item>
            </Form>
        )
    }
}
SearchForm = Form.create()(SearchForm);
export default SearchForm;