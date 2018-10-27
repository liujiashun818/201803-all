import * as types from '../action-types';
export default {
    login(payload) {
        return { type: types.LOGIN, payload };
    },
    logout() {
        return { type: types.LOGOUT };
    },
    loadUser() {
        return { type: types.LOAD_USER };
    }
}