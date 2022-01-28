import {createStore, combineReducers} from 'redux';
import {item} from './reducers/ItemReducer'
import { card } from './reducers/cardReducer';

const rootReducer = combineReducers({
    item,
    card
})

export const store = createStore(rootReducer)