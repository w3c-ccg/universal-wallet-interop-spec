import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Remove';

import { RemoveDialogContent } from './RemoveDialogContent';

export const buildRemoveInterface = (
  wallet: any,
  dialogState: any,
  setDialogState: any,
  handleSubmit: any
) => {
  const contentAsOptions = wallet.contents.map((content: any) => {
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
            <RemoveIcon />
          </ListItemIcon>
          <ListItemText primary={'Remove'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Remove',
    dialogSubmitTitle: 'Remove',
    dialogContent: (
      <RemoveDialogContent
        value={dialogState.selected}
        options={contentAsOptions}
        onChange={(value) => {
          setDialogState({
            ...dialogState,
            selected: value,
          });
        }}
      />
    ),
    handleSubmit,
    handleCancel: async () => {},
  };
};
