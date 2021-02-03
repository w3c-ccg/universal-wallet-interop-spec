import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';

import { CapturePasswordDialogContent } from '../../../atoms/CapturePasswordDialog';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

export const buildExportInterface = (
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
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary={'Export'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Export',
    dialogSubmitTitle: 'Export',
    dialogContent: (
      <CapturePasswordDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={(dialogState: any) => {
          setDialogState(dialogState);
        }}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
