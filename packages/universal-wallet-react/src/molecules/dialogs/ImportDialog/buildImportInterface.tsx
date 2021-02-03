import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { ImportDialogContent } from './ImportDialogContent';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

export const buildImportInterface = (
  wallet: any,
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
          <ListItemText primary={'Import'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Import',
    dialogSubmitTitle: 'Import',
    dialogContent: (
      <ImportDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
