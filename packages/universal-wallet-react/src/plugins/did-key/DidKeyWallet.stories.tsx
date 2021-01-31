import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DidKeyWallet as Component, Props } from './DidKeyWallet';

const meta: Meta = {
  title: 'Plugins/DID Key',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const DIDKey = Template.bind({});

DIDKey.args = {};
