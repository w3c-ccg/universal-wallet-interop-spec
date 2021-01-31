import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SelectByImage as Component, Props } from './SelectByImage';

const meta: Meta = {
  title: 'Atoms/Select By Image',
  component: Component,
};

export default meta;

const options = [
  {
    value:
      'did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f',
    logo: 'https://issuer.interop.transmute.world/logo512.png',
    label: 'Key 0',
  },
  {
    value:
      'did:key:z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f#z6Mkn28V7Mk7TyvS82GH5CByFWgBeTbtUedc3HDvJz4bta5f',
    logo: 'https://issuer.interop.transmute.world/logo512.png',
    label: 'Key 1',
  },
];

const value = options[0];

const label = 'Select issuer key';

const onChange = (option: any) => {
  console.log('selected: ', option);
};

const Template: Story<Props> = (args) => <Component {...args} />;

export const SelectByImage = Template.bind({});

SelectByImage.args = {
  options,
  value,
  label,
  onChange,
};
