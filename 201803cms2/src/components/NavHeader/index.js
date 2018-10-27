
import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { connect } from 'dva';
import { Layout, Upload, Icon, message } from 'antd';
import styles from './index.less';
class NavHeader extends Component {
    state = { loading: false, imageUrl: this.props.user ? this.props.user.avatar : '' }
    componentWillMount() {
        this.props.dispatch({ type: 'login/restoreUser' });
    }
    beforeUpload = (file) => {
        //上传前检查内容类型
        const isJPG = file.type === 'image/png';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        //上传前检查文件大小
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            let imageUrl = info.file.response.data;
            this.setState({ loading: false, imageUrl });
        }
    }

    render() {
        const uploadButton = (
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
        );
        let uid = this.props.user ? this.props.user.id : '';
        return (
            <Layout.Header className={styles.header}>
                <img src={logo} className={styles.logo} />
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className={styles.uploader}
                    showUploadList={false}
                    action={`http://127.0.0.1:7001/upload/${uid}`}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {this.props.user && this.props.user.avatar ? <img src={this.props.user.avatar} alt="avatar" /> : uploadButton}
                </Upload>
            </Layout.Header >
        )
    }
}
export default connect(
    state => state.login
)(NavHeader);