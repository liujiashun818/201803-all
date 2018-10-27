import { createStore } from 'redux';
//import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
let initState = Map({ number: 0 });
function counter(state = initState, action) {
    switch (action.type) {
        case 'ADD':
            return state.update('number', val => val + action.payload);
        default:
            return state;
    }
}
function combineReducers(reducers) {
    return function (state = Map({}), action) {
        let newState = Map({});
        for (let key in reducers) {
            //key = counter
            newState = newState.set(key, reducers[key](state.get(key), action));
        }
        return newState;
    }
}
//{counter:{number:0}}
let reducers = combineReducers({
    counter
});
let store = createStore(reducers);
export default store;