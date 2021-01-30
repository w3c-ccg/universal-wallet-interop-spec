import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Thing, Props } from './Thing';

const meta: Meta = {
  title: 'Atoms/Thing',
  component: Thing,
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

const Template: Story<Props> = (args) => <Thing {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

export const WithChildren = Template.bind({});

WithChildren.args = {
  children: <>hello world</>,
};
