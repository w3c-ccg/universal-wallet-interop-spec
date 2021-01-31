import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { RemoveDialogContent as Component, Props } from './RemoveDialogContent';

const meta: Meta = {
  title: 'Molecules/Dialogs/Remove/Content',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

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

const value = options[0];

const onChange = (option: any) => {
  action('onChange')(option);
};

export const Content = Template.bind({});

Content.args = {
  options,
  onChange,
  value,
};
