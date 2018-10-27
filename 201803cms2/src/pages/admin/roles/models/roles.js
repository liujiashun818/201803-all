import * as service from '../services/roles';
import { message } from 'antd';
const ENTITY = 'roles';
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
    conditions: {},
    checkedKeys: [],
    showSetResources: false,
    resources: [],//顶级菜单对象的数组
    users: [],
    targetKeys: [],
    showSetUsers: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname == `/admin/${ENTITY}`) {
          dispatch({ type: 'getList', payload: 1 });
          dispatch({ type: 'getResources' });
          dispatch({ type: 'getUsers' });
        }
      });
    }
  },

  effects: {
    *getList({ payload: current }, { call, put, select }) {
      let pageSize = yield select(state => state[ENTITY].pageSize);
      let { data: { total, list }, code } = yield call(service.list, current, pageSize);
      debugger;
      if (code == 0) {
        yield put({ type: 'changeState', payload: { total, list, current } })
      }
    },
    *search({ payload: conditions }, { call, put, select }) {
      let pageSize = yield select(state => state[ENTITY].pageSize);
      yield put({ type: 'changeState', payload: { conditions } });
      let { data: { total, list }, code, error } = yield call(service.list, 1, pageSize, conditions);
      if (code == 0) {
        yield put({ type: 'changeState', payload: { total, list, current: 1 } })
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *confirmSetResources({ payload }, { call, put, select }) {
      let { checkedKeys, record, list } = yield select(state => state.roles);
      let { id: roleId } = record;
      let { data, code, error } = yield call(service.setResources, roleId, checkedKeys);
      if (code == 0) {
        yield put({
          type: 'changeState', payload: {
            showSetResources: false,
            list: list.map(item => {
              if (item.id == record.id) {
                item.resourceIds = checkedKeys;
              }
              return item;
            })
          }
        })
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *confirmSetUsers({ payload }, { call, put, select }) {
      let { targetKeys: userIds, record, list } = yield select(state => state.roles);
      let { id: roleId } = record;
      let { data, code, error } = yield call(service.setUsers, roleId, userIds);
      if (code == 0) {
        yield put({
          type: 'changeState', payload: {
            showSetUsers: false,
            list: list.map(item => {
              if (item.id == record.id) {
                item.userIds = userIds;
              }
              return item;
            })
          }
        })
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *getResources({ payload }, { call, put, select }) {
      let { data: resources, code, error } = yield call(service.getResources);
      if (code == 0) {
        yield put({ type: 'changeState', payload: { resources } })
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *getUsers({ payload }, { call, put, select }) {
      let { data: users, code, error } = yield call(service.getUsers);
      if (code == 0) {
        yield put({ type: 'changeState', payload: { users } })
      } else {
        yield put({ type: 'setErrorInfo', payload: error });
      }
    },
    *create({ payload }, { call, put, select }) {
      let { code, data, error } = yield call(service.create, payload);
      if (code == 0) {
        let current = yield select(state => state[ENTITY].current);
        yield put({ type: 'list', payload: current });
        yield put({ type: 'changeState', payload: { showEditModal: false, record: {}, isCreate: true } });
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
        yield put({ type: 'changeState', payload: { showEditModal: false, record: {}, isCreate: true } });
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
    setErrorInfo(state, { payload }) {
      return { ...state, errorInfo: payload };
    },
    changeState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
