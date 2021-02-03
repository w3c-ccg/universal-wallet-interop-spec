import React from 'react';
import { Meta, Story } from '@storybook/react';

import { EdvWallet as Component, Props } from './EdvWallet';

const meta: Meta = {
  title: 'Plugins/EDV Wallet',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const EDVWallet = Template.bind({});

EDVWallet.args = {};
