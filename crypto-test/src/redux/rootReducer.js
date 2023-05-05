import { combineReducers } from 'redux';
import counterReducer from './counter/counterSlice';
import studentReducer from './counter/studentSlice'

export const rootReducer = combineReducers({
  counter: counterReducer,
  student: studentReducer
})