import React from 'react';
import { Meta, Story } from '@storybook/react';
import { JsonEditor as Component, Props } from './JsonEditor';

const meta: Meta = {
  title: 'Atoms/JsonEditor',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const JsonEditor = Template.bind({});

JsonEditor.args = {
  value: '{}',
};
