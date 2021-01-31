import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddDialogContent as Component, Props } from './AddDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Add/Content',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Content = Template.bind({});

Content.args = {
  value: '{}',
  onChange: (value: string) => {
    action('onChange')(value);
  },
};
