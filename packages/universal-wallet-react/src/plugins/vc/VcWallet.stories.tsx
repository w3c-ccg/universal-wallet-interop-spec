import React from 'react';
import { Meta, Story } from '@storybook/react';

import { VcWallet as Component, Props } from './VcWallet';

const meta: Meta = {
  title: 'Plugins/VC Wallet',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const VCWallet = Template.bind({});

VCWallet.args = {};
