import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  CreateVerifiablePresentationDialogContent as Component,
  Props,
} from './CreateVerifiablePresentationDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Present/Content',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Content = Template.bind({});

const options = [
  {
    value: 'did:example:123#key-0',
    logo: 'https://issuer.interop.transmute.world/logo512.png',
    label: 'Key 0',
  },
  {
    value: 'did:example:456#key-1',
    logo: 'https://issuer.interop.transmute.world/logo512.png',
    label: 'Key 1',
  },
];

Content.args = {
  options,
  dialogState: {
    domain: 'example.com',
    challenge: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
  },
  // this method is used to handle the result of submitting the dialog
  setDialogState: (state: any) => {
    // here is where you
    // wire the dialog result to your wallet.
    action('setDialogState')(state);
  },
};
