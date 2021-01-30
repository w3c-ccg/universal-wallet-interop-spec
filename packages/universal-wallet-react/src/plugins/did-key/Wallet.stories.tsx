import React from 'react';
import { Meta, Story } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import {
  UniversalWalletCard as Component,
  Props,
} from '../../organisms/WalletCard/UniversalWalletCard';

import { wallet } from './wallet';

const meta: Meta = {
  title: 'Plugins/DID Key',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Wallet = Template.bind({});

Wallet.args = {
  wallet,
  handleWalletOperation: async (operationId: string, operationInput: any) => {
    const contents = await wallet.generateContentFromSeed(
      Buffer.from(operationInput.seed, 'hex')
    );
    contents.forEach((content) => {
      wallet.add(content);
    });

    action('did-key plugin handled')({
      operationId,
      operationInput,
      wallet,
    });
  },
};
