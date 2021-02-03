import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { IssueCredentialDialogContent } from './IssueCredentialDialogContent';

export const buildIssueCredentialInterface = (
  wallet: any,
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
          <ListItemText primary={'Issue'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Issue',
    dialogSubmitTitle: 'Issue',
    dialogContent: (
      <IssueCredentialDialogContent
        options={contentAsOptions}
        setDialogState={setDialogState}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
