import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Fullscreen, Props } from './Fullscreen';
import Button from '@material-ui/core/Button';

const meta: Meta = {
  title: 'Atoms/Fullscreen Dialog',
  component: Fullscreen,
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

const Template: Story<Props> = (args) => <Fullscreen {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  dialogTitle: 'Dialog Title',
  dialogSubmitTitle: 'Dialog Sub Title',
  trigger: <Button>trigger</Button>,
  handleCancel: () => {},
  handleSubmit: () => {},
  children: <>children....</>,
};
