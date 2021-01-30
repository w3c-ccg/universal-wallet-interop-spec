import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DialogContent as Component, Props } from './DialogContent';

import { passwordToKey, seedToId } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Generate',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const DialogContent = Template.bind({});

DialogContent.args = {
  // these methods are used by the dialog
  passwordToKey,
  seedToId,
  // this method is used to handle the result of submitting the dialog
  setDialogState: (state: any) => {
    // here is where you
    // wire the dialog result to your wallet.
    action('setDialogState')(state);
  },
};
