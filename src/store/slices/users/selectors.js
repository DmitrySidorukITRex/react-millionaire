import { shallowEqual, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { name } from './constants';

export const usersSelector = (state) => state[name];

const selectUsers = createSelector(
  (state) => usersSelector(state),
  (_) => _,
  ({ users }) => users
);

const selectUsersLoading = createSelector(
  (state) => usersSelector(state),
  (_) => _,
  ({ loading }) => loading
);

export const useUsersRating = () => useSelector(selectUsers, shallowEqual);

export const useUsersLoading = () => useSelector(selectUsersLoading);
