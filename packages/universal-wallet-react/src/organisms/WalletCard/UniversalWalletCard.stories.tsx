import React from 'react';
import { Meta, Story } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { UniversalWalletCard as Component, Props } from './UniversalWalletCard';

import { emptyWallet, fullWallet } from '../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Organisms/Wallet',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Empty = Template.bind({});

Empty.args = {
  wallet: emptyWallet,
  handleWalletOperation: (operationId: string, operationInput: any) => {
    action('use a plugin to handle')({
      operationId,
      operationInput,
    });
    // here you handle wallet interface calls
    // then update wallet prop.
  },
};

export const Full = Template.bind({});

Full.args = {
  wallet: fullWallet,
  handleWalletOperation: (operationId: string, operationInput: any) => {
    action('use a plugin to handle')({
      operationId,
      operationInput,
    });
    // here you handle wallet interface calls
    // then update wallet prop.
  },
};
