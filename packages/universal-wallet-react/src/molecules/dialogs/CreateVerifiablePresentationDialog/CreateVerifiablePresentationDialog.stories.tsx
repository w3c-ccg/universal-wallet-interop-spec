import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { CreateVerifiablePresentationDialogContent } from './CreateVerifiablePresentationDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Present/Dialog',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Dialog = Template.bind({});

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

Dialog.args = {
  dialogTrigger: <Button>trigger</Button>,
  dialogTitle: 'Present',
  dialogSubmitTitle: 'Present',
  dialogContent: (
    <CreateVerifiablePresentationDialogContent
      options={options}
      dialogState={{
        domain: 'example.com',
        challenge: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
      }}
      setDialogState={(state: any) => {
        action('setDialogState')(state);
      }}
    />
  ),
  handleSubmit: async () => {
    action('handleSubmit')();
  },
  handleCancel: async () => {
    action('handleCancel')();
  },
};
