import * as service from '../services/resources';
import { message } from 'antd';
const ENTITY = 'resources';
export default {

  namespace: ENTITY,

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
      history.listen(({ pathname, query }) => {
        if (pathname == `/admin/${ENTITY}`) {
          dispatch({ type: 'list', payload: 1 });
        }
      });
    }
  },

  effects: {
    *list({ payload: current }, { call, put, select }) {
      let pageSize = yield select(state => state[ENTITY].pageSize);
      let { data: { total, list }, code } = yield call(service.list, current, pageSize);
      if (code == 0) {
        yield put({ type: 'listed', payload: { total, list, current } })
      }
    },
    *search({ payload: conditions }, { call, put, select }) {
      let pageSize = yield select(state => state[ENTITY].pageSize);
      yield put({ type: 'changeState', payload: { conditions } });
      let { data: { total, list }, code } = yield call(service.list, 1, pageSize, conditions);
      if (code == 0) {
        yield put({ type: 'listed', payload: { total, list, current: 1 } })
      }
    },
    *create({ payload }, { call, put, select }) {
      let { code, data, error } = yield call(service.create, payload);
      if (code == 0) {
        let current = yield select(state => state[ENTITY].current);
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
        let current = yield select(state => state[ENTITY].current);
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
        let current = yield select(state => state[ENTITY].current);
        yield put({ type: 'list', payload: current });
      } else {
        message.error(error);
      }
    },
    *delMulti({ payload }, { call, put, select }) {
      const selectedRowKeys = yield select(state => state[ENTITY].selectedRowKeys);
      let { code, data, error } = yield call(service.delMulti, selectedRowKeys);
      if (code == 0) {
        let current = yield select(state => state[ENTITY].current);
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
    changeState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
