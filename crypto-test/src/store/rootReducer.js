import { combineReducers } from 'redux';
import studentReducer from './slice/student.slice';

export const rootReducer = combineReducers({
  student: studentReducer
})