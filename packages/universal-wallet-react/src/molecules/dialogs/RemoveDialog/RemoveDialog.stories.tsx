import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { RemoveDialogContent } from './RemoveDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Remove/Dialog',
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
  dialogTitle: 'Remove',
  dialogSubmitTitle: 'Remove',
  dialogContent: (
    <RemoveDialogContent
      value={options[0]}
      options={options}
      onChange={(selected: any) => {
        action('onChange')(selected);
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
