import { createStore, combineReducers } from 'redux';
import { addData } from './reducer'


let rootReducer = combineReducers({
    listData: addData,
});

export default createStore(rootReducer);