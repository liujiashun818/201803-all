import * as service from '../services/login';
import { decode } from 'jsonwebtoken';
import { routerRedux } from 'dva/router';
export default {
    //修改命名空间
    namespace: 'login',
    //此命名空间的状态
    state: {
        errorInfo: '',
        user: null,
        isSignup: false //判断当前是登录还是注册
    },

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *login({ payload }, { call, put }) {
            const { code, data: token, error } = yield call(service.login, payload);
            if (code == 0) {
                window.localStorage.setItem('token', token);
                let user = decode(token);
                yield put({ type: 'setUser', payload: user });
                yield put({ type: 'setErrorInfo', payload: '' });
                yield put(routerRedux.push('/admin/users'));
            } else {
                yield put({ type: 'setErrorInfo', payload: error });
            }
        },
        *signup({ payload }, { call, put }) {
            const { code, data, error } = yield call(service.signup, payload);
            if (code == 0) {
                yield put({ type: 'changeSignupStatus' });
                yield put({ type: 'setErrorInfo', payload: '' });
            } else {
                yield put({ type: 'setErrorInfo', payload: error });
            }
        },
        *restoreUser({ payload }, { call, put }) {
            let token = window.localStorage.getItem('token');
            if (token) {
                let user = decode(token);
                console.log('user', user);
                yield put({ type: 'setUser', payload: user });
            } else {
                yield put(routerRedux.push('/login'));
            }
        }
    },

    reducers: {
        changeSignupStatus(state, action) {
            return { ...state, isSignup: !state.isSignup };
        },
        setErrorInfo(state, { payload }) {
            return { ...state, errorInfo: payload };
        },
        setUser(state, { payload }) {
            return { ...state, user: payload };
        }
    },

};


/**
 * combineReducer({
    login:login
})
{
    login:{isSignup: false}
}

login = function(state,action){
  switch(action.type){
      case 'changeSignupStatus':
       return { ...state, isSignup: !state.isSignup };
  }
}
 */