import React from 'react';
import { action } from '@storybook/addon-actions';

import ExploreIcon from '@material-ui/icons/Explore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Meta, Story } from '@storybook/react';

import { CapturePasswordDialogContent } from '../../atoms/CapturePasswordDialog';
import { passwordToKey, seedToId } from '../../__fixtures__/wallet';
import { WalletMenu as Component, Props } from './WalletMenu';

const meta: Meta = {
  title: 'Organisms/Wallet Menu',
};

export default meta;

const list = [
  {
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
    dialogTitle: 'Generate',
    dialogSubmitTitle: 'Generate',
    dialogContent: (
      <CapturePasswordDialogContent
        seedToId={seedToId}
        passwordToKey={passwordToKey}
        setDialogState={(state: any) => {
          action('setDialogState')(state);
        }}
      />
    ),
    handleSubmit: async () => {
      action('handleSubmit')();
    },
    handleCancel: async () => {
      action('handleCancel')();
    },
  },
];

const Template: Story<Props> = (args) => <Component {...args} />;

export const WalletMenu = Template.bind({});

WalletMenu.args = {
  list,
};
