import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  SyncContentDialogContent as Component,
  Props,
} from './SyncContentDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Sync/Content',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Content = Template.bind({});

Content.args = {
  dialogState: {
    edvEndpoint: 'https://example.com/edvs',
    edvFilter: 'https://schema.org/UniversalWallet',
    password: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
  },
  // this method is used to handle the result of submitting the dialog
  setDialogState: (state: any) => {
    // here is where you
    // wire the dialog result to your wallet.
    action('setDialogState')(state);
  },
};
