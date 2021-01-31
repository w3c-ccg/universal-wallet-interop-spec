import React, { FC, HTMLAttributes } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { FullscreenDialog } from '../../atoms/FullscreenDialog';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  list: any;
}

export const WalletMenu: FC<Props> = ({ list }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="interface"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="wallet-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {list.map((item: any) => {
          return (
            <MenuItem key={'item-' + item.dialogTitle}>
              <FullscreenDialog
                {...item}
                handleSubmit={() => {
                  item.handleSubmit();
                  handleClose();
                }}
                handleCancel={() => {
                  item.handleCancel();
                  handleClose();
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
