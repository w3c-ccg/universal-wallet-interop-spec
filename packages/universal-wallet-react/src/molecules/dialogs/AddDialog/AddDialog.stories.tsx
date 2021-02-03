import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { AddDialogContent } from './AddDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Add/Dialog',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Dialog = Template.bind({});

Dialog.args = {
  dialogTrigger: <Button>trigger</Button>,
  dialogTitle: 'Add',
  dialogSubmitTitle: 'Add',
  dialogContent: (
    <AddDialogContent
      value={'{}'}
      onChange={(value) => {
        action('onChange')(value);
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
