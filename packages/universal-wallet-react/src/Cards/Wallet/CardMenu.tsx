import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CardMenu({ menu }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        {menu.map((item: any) => {
          const Icon = item.icon;
          const Dialog = item.dialog;
          return (
            <MenuItem
              key={item.title}
              disabled={item.disabledWhen && item.disabledWhen()}
            >
              <Dialog
                trigger={
                  <List>
                    <ListItem style={{ padding: '0px' }}>
                      <ListItemIcon>
                        <Icon {...item.iconProps} />
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  </List>
                }
                {...item.dialogProps}
                handleSubmit={(args: any) => {
                  handleClose();
                  item.dialogProps.handleSubmit(args);
                }}
                handleCancel={() => {
                  handleClose();
                  item.dialogProps.handleCancel();
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
