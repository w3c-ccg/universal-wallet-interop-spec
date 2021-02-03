import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { SyncContentDialogContent } from './SyncContentDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Sync/Dialog',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Dialog = Template.bind({});

Dialog.args = {
  dialogTrigger: <Button>trigger</Button>,
  dialogTitle: 'Sync',
  dialogSubmitTitle: 'Sync',
  dialogContent: (
    <SyncContentDialogContent
      dialogState={{
        edvEndpoint: 'https://example.com/edvs',
        edvFilter: 'https://schema.org/UniversalWallet',
        password: '8bb1cfda-9d31-46fc-9742-72b48747a2f1',
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
