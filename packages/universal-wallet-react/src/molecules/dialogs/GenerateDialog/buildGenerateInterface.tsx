import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';

import { CapturePasswordDialogContent } from '../../../atoms/CapturePasswordDialog';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

export const buildGenerateInterface = (
  wallet: any,
  setDialogState: any,
  handleSubmit: any
) => {
  return {
    disabledWhen: () => {
      return wallet.contents.length !== 0;
    },
    dialogTitle: 'Generate',
    dialogSubmitTitle: 'Generate',
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary={'Generate'} />
        </ListItem>
      </List>
    ),
    dialogContent: (
      <CapturePasswordDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
