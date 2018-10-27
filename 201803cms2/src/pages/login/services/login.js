import request from '../../../utils/request';

export function login(payload) {
    return request('/login', {//指定请求的URL地址
        method: 'POST',//指定请求的方法
        headers: { 'Content-Type': 'application/json' },//这里指定请求头的名称和值
        body: JSON.stringify(payload)
    });
}

export function signup(payload) {
    return request('/signup', {//指定请求的URL地址
        method: 'POST',//指定请求的方法
        headers: { 'Content-Type': 'application/json' },//这里指定请求头的名称和值
        body: JSON.stringify(payload)
    });
}