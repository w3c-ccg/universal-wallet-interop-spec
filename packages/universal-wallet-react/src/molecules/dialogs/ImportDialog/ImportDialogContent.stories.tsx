import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ImportDialogContent as Component, Props } from './ImportDialogContent';

import { passwordToKey, seedToId } from '@transmute/universal-wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Import/Content',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Content = Template.bind({});

Content.args = {
  passwordToKey,
  seedToId,
  // this method is used to handle the result of submitting the dialog
  setDialogState: (state: any) => {
    // here is where you
    // wire the dialog result to your wallet.
    action('setDialogState')(state);
  },
};
