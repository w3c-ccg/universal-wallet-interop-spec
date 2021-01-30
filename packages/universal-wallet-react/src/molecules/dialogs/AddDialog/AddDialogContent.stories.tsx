import React from 'react';
import { Meta, Story } from '@storybook/react';

import { AddDialogContent as Component, Props } from './AddDialogContent';

import { fullWallet } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Add',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Content = Template.bind({});

Content.args = {
  contents: fullWallet.contents,
};
