import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { CreateVerifiablePresentationDialogContent } from './CreateVerifiablePresentationDialogContent';

export const buildVerifiablePresentationDialogInterface = (
  wallet: any,
  dialogState: any,
  setDialogState: any,
  handleSubmit: any
) => {
  const contentAsOptions = wallet.contents
    .filter((i: any) => {
      return i?.publicKeyJwk?.crv === 'Ed25519';
    })
    .map((content: any) => {
      return {
        value: content.id,
        logo: content.image || 'https://via.placeholder.com/150',
        label: content.name || content.id,
      };
    });
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
          <ListItemText primary={'Present'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Present',
    dialogSubmitTitle: 'Present',
    dialogContent: (
      <CreateVerifiablePresentationDialogContent
        options={contentAsOptions}
        dialogState={dialogState}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
