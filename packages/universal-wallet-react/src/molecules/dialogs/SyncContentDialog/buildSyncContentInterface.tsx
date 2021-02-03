import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SyncIcon from '@material-ui/icons/Sync';

import { SyncContentDialogContent } from './SyncContentDialogContent';

export const buildSyncContentInterface = (
  wallet: any,
  dialogState: any,
  setDialogState: any,
  handleSubmit: any
) => {
  return {
    disabledWhen: () => {
      return wallet.status === 'LOCKED' || wallet.contents.length === 0;
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <SyncIcon />
          </ListItemIcon>
          <ListItemText primary={'Sync'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Sync',
    dialogSubmitTitle: 'Sync',
    dialogContent: (
      <SyncContentDialogContent
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
