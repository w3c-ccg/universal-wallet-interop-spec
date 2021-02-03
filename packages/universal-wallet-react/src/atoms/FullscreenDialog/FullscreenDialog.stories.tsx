import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FullscreenDialog, Props } from './FullscreenDialog';
import Button from '@material-ui/core/Button';

const meta: Meta = {
  title: 'Atoms/Fullscreen Dialog',
  component: FullscreenDialog,
};

export default meta;

const Template: Story<Props> = (args) => <FullscreenDialog {...args} />;

export const Default = Template.bind({});

Default.args = {
  dialogTitle: 'Dialog Title',
  dialogSubmitTitle: 'Dialog Sub Title',
  dialogContent: <div>dialog content....</div>,
  dialogTrigger: <Button>trigger</Button>,
  handleCancel: () => {},
  handleSubmit: () => {},
};
