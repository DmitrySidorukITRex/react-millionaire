import { combineReducers } from 'redux';
import { auth } from './slices/auth/slice';
import { users } from './slices/users/slice';

const rootReducer = combineReducers({
  [users.name]: users.reducer,
  [auth.name]: auth.reducer,
});

export default rootReducer;
