import * as types from "../action-types";
//user这个子状态会存登录的用户和当前的错误信息
let initState = { user: null, error: null };
export default function (state = initState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state, user: action.user, error: null };
        case types.LOGIN_FAIL:
            return { ...state, user: null, error: action.error };
        case types.LOGOUT_SUCCESS:
            return { ...state, user: null, error: null };
        default:
            return state;
    }

}