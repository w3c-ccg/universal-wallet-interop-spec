import React from 'react';
import { Meta, Story } from '@storybook/react';

import { WalletContentTable as Component, Props } from './WalletContentTable';

// import { wallet } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Table',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Empty = Template.bind({});

Empty.args = {
  label: 'Example Table',
  rows: [],
};

export const Full = Template.bind({});

Full.args = {
  label: 'Example Table',
  rows: [
    {
      id: '123',
      type: 'FooType',
    },
  ],
};
