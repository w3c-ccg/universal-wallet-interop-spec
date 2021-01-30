import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LinkedDataIdentifier, Props } from './LinkedDataIdentifier';

const meta: Meta = {
  title: 'Atoms/Linked Data Identifier',
  component: LinkedDataIdentifier,
};

export default meta;

const Template: Story<Props> = (args) => <LinkedDataIdentifier {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  value: 'did:example:123',
};
