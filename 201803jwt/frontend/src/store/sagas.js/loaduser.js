
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