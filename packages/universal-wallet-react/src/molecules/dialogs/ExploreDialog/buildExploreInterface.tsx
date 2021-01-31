import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';

import { ExploreDialogContent } from './ExploreDialogContent';

export const buildExploreInterface = (wallet: any, handleSubmit: any) => {
  return {
    disabledWhen: () => {
      return wallet.status === 'LOCKED' || wallet.contents.length === 0;
    },
    dialogTrigger: (
      <List>
        <ListItem style={{ padding: '0px' }}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary={'Explore'} />
        </ListItem>
      </List>
    ),
    dialogTitle: 'Explore',
    dialogSubmitTitle: 'Explore',
    dialogContent: <ExploreDialogContent contents={wallet.contents} />,
    handleSubmit,
    handleCancel: async () => {},
  };
};
