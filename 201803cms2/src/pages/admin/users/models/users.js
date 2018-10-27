import * as service from '../services/users';
import { message } from 'antd';
export default {

  namespace: 'users',

  state: {
    list: [],
    total: 0,
    current: 1,
    pageSize: 3,
    showEditModal: false,
    record: {},
    isCreate: true,//默认弹出框为添加
    errorInfo: '',

    selectedRowKeys: [],
    conditions: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // /users?page=1&pageSize=3 pathname=/users query={page:1,pageSize:3}
      history.listen(({ pathname, query }) => {
        if (pathname == '/admin/users') {
          dispatch({ type: 'list', payload: 1 });
        }
      });
    }
  },

  effects: {
    *list({ payload: current }, { call, put, select }) {
      let pageSize = yield select(state => state.users.pageSize);
      let { data: { total, list }, code } = yield call(service.list, current, pageSize);
      if (code == 0) {
        yield put({ type: 'listed', payload: { total, list, current } })
      }
    },
    *search({ payload: conditions }, { call, put, select }) {
      let pageSize = yield select(state => state.users.pageSize);
      yield put({ type: 'changeUsers', payload: { conditions } });
      let { data: { total, list }, code } = yield call(service.list, 1, pageSize, conditions);
      if (code == 0) {
        yield put({ type: 'listed', payload: { total, list, current: 1 } })
      }
    },
    *create({ payload }, { call, put, select }) {
      let { code, data, error } = yield call(service.create, payload);
      if (code == 0) {
        let current = yield select(state => state.users.current);
        yield put({ type: 'list', payload: current });
        yield put({ type: 'changeEditModal', payload: { showEditModal: false, record: {}, isCreate: true } });
        yield put({ type: 'setErrorInfo', payload: '' });
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *update({ payload }, { call, put, select }) {
      let { code, data, error } = yield call(service.update, payload);
      if (code == 0) {
        let current = yield select(state => state.users.current);
        yield put({ type: 'list', payload: current });
        yield put({ type: 'changeEditModal', payload: { showEditModal: false, record: {}, isCreate: true } });
        yield put({ type: 'setErrorInfo', payload: '' });
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *remove({ payload }, { call, put, select }) {

      let { code, data, error } = yield call(service.remove, payload);
      if (code == 0) {
        let current = yield select(state => state.users.current);
        yield put({ type: 'list', payload: current });
      } else {
        message.error(error);
      }
    },
    *delMulti({ payload }, { call, put, select }) {
      const selectedRowKeys = yield select(state => state.users.selectedRowKeys);
      let { code, data, error } = yield call(service.delMulti, selectedRowKeys);
      if (code == 0) {
        let current = yield select(state => state.users.current);
        yield put({ type: 'list', payload: current });
      } else {
        message.error(error);
      }
    }
  },

  reducers: {
    listed(state, { payload }) {
      return { ...state, ...payload };
    },
    changeEditModal(state, { payload }) {
      return { ...state, ...payload };
    },
    setErrorInfo(state, { payload }) {
      return { ...state, errorInfo: payload };
    },
    changeUsers(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
