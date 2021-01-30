import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FullscreenDialog, Props } from './FullscreenDialog';
import Button from '@material-ui/core/Button';

const meta: Meta = {
  title: 'Atoms/Fullscreen Dialog',
  component: FullscreenDialog,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => <FullscreenDialog {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  dialogTitle: 'Dialog Title',
  dialogSubmitTitle: 'Dialog Sub Title',
  dialogContent: <div>dialog content....</div>,
  trigger: <Button>trigger</Button>,
  handleCancel: () => {},
  handleSubmit: () => {},
  children: <>children....</>,
};
