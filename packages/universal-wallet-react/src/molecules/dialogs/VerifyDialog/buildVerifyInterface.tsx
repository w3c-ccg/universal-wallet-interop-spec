import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { VerifyDialogContent } from './VerifyDialogContent';

export const buildVerifyInterface = (
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
            <UnarchiveIcon />
          </ListItemIcon>
          <ListItemText primary={'Verify'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Verify',
    dialogSubmitTitle: 'Verify',
    dialogContent: (
      <VerifyDialogContent
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
