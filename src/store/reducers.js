import { combineReducers } from 'redux';
import { users } from './slices/users/slice';

const rootReducer = combineReducers({
  [users.name]: users.reducer,
});

export default rootReducer;
