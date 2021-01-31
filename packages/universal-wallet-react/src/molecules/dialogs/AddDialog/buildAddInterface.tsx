import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';

import { AddDialogContent } from './AddDialogContent';

export const buildAddInterface = (
  wallet: any,
  dialogState: any,
  setDialogState: any,
  handleSubmit: any
) => {
  return {
    disabledWhen: () => {
      return wallet.status === 'LOCKED';
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={'Add'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Add',
    dialogSubmitTitle: 'Add',
    dialogContent: (
      <AddDialogContent
        value={dialogState.editor}
        onChange={(value) => {
          setDialogState({
            ...dialogState,
            editor: value,
          });
        }}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
