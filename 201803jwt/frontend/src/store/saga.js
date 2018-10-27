import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as types from './action-types';//命名空间的作用
import userApi from '../api/user';
import articleApi from '../api/article';
import { decode } from '../utils/jwt';
import { push } from 'react-router-redux';
function* login(action) {
    let { payload } = action;
    try {
        //call表示调用一个方法.payload是传给此方法的参数，此方法的返回一个promise, saga会等待promise完成，也就是接口请求响应回来后，拿到响应体后再进行后续 的处理
        let response = yield call(userApi.login, payload); //{type:'call',fn:login,}
        let jwtToken = response.data.jwtToken;
        //一定要把得到的token保存在本地硬盘上
        window.localStorage.setItem('jwtToken', jwtToken);
        let user = decode(jwtToken);
        //put参数是一个action对象，用来向仓库派发一个action，就相当于store.dispatch(action);
        //put没有返回值{type:"@@router/CALL_HISTORY_METHOD",method:"push",path:"/"}
        //history[method].apply(history, args);
        yield put({ type: types.LOGIN_SUCCESS, user });
        yield put(push('/'));//
    } catch (error) {
        yield put({ type: types.LOGIN_FAIL, error });
    }
}
function* logout() {
    window.localStorage.removeItem('jwtToken');
    yield put({ type: types.LOGOUT_SUCCESS });
    yield put(push('/users/signin'))
}

function* loginFlow() {
    //当监听到LOGIN的动作的时候，会交给login函数来处理
    yield takeEvery(types.LOGIN, login);// {payload:{username,password}}
    yield takeEvery(types.LOGOUT, logout);
}
function* loadUser() {
    let jwtToken = window.localStorage.getItem('jwtToken');
    if (jwtToken) {
        let user = decode(jwtToken);
        yield put({ type: types.LOGIN_SUCCESS, user });
        yield put(push('/'));
    }
}
function* watchLoadUser() {
    yield takeEvery(types.LOAD_USER, loadUser);
}
function* addArticle(action) {
    let { payload } = action;//{title,content}
    try {
        let response = yield call(articleApi.addArticle, payload);
        yield put({ type: types.ADD_ARTICLE_SUCCESS });
        yield put(push('/'));
    } catch (error) {
        debugger;
        yield put({ type: types.ADD_ARTICLE_FAIL, error });
    }
}
function* watchAddArticle() {
    yield takeEvery(types.ADD_ARTICLE, addArticle);
}
export default function* rootSaga() {
    yield all([loginFlow(), watchLoadUser(), watchAddArticle()]);
}