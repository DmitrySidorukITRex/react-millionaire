import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';
import classes from './menu.module.scss';

const BasicMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button startIcon={<MoreVertOutlinedIcon />} onClick={handleClick}></Button>
      <Menu id="basic-menu" className={classes.menu} anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </div>
  );
};

export default BasicMenu;
