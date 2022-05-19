import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import { name } from './constants';

export const authSelectors = (state) => state[name];

const selectIsLoggedIn = createSelector(
  authSelectors,
  (_) => _,
  ({ loggedIn }) => loggedIn
);

export const selectCurrentUser = createSelector(
  authSelectors,
  (_) => _,
  ({ user }) => user
);

export const selectError = createSelector(
  authSelectors,
  (_) => _,
  ({ error }) => error
);

export const useLoggedIn = () => useSelector(selectIsLoggedIn, shallowEqual);
export const useCurrentUser = () => useSelector(selectCurrentUser, shallowEqual);
export const useAuthError = () => useSelector(selectError, shallowEqual);
