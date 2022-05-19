import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BasicMenu from '../../shared/components/menu/menu';
import { useUsersLoading, useUsersRating } from '../../store/slices/users/selectors';
import { getUsersRating, removeUser, resetUserRating } from '../../store/slices/users/thunks';
import { useAppDispatch } from '../../store/store';
import classes from './rating.module.scss';

const Rating = (props) => {
  // const { usersRating, getUsersRating } = useContext(UsersContext);
  const usersRating = useUsersRating();
  const loading = useUsersLoading();
  const dispatch = useAppDispatch();
  const columns = ['Name', 'Email', 'Number of games', 'Money earned', ''];

  useEffect(() => {
    dispatch(getUsersRating());
  }, [dispatch]);

  const onDeleteUser = (id) => {
    dispatch(removeUser(id)).then(() => {
      dispatch(getUsersRating());
    });
  };

  const onResetUserRating = (id) => {
    dispatch(resetUserRating(id)).then(() => dispatch(getUsersRating()));
  };

  const headerColumns = columns.map((column, index) => {
    return (
      <TableCell key={index} align="center">
        {column}
      </TableCell>
    );
  });
  const dataRows = usersRating.map((user, index) => {
    return (
      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="center">{`${user.lastName} ${user.firstName}`}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.gamesCount}</TableCell>
        <TableCell align="center">{user.scores}</TableCell>
        <TableCell align="center">
          <BasicMenu>
            <MenuItem onClick={onResetUserRating.bind(this, user._id)}>Reset Rating</MenuItem>
            <MenuItem onClick={onDeleteUser.bind(this, user._id)}>Delete</MenuItem>
          </BasicMenu>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <>
      {!loading ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>{headerColumns}</TableRow>
            </TableHead>
            <TableBody>{dataRows}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress color="inherit" className={classes.loader} />
      )}
    </>
  );
};

// const RatingWithContext = () => {
//   return (
//     <UsersProvider>
//       <Rating />
//     </UsersProvider>
//   );
// };

export default Rating;
