import React from 'react';
import { Meta, Story } from '@storybook/react';

import {
  ExploreDialogContent as Component,
  Props,
} from './ExploreDialogContent';

import { fullWallet } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Explore',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Content = Template.bind({});

Content.args = {
  contents: fullWallet.contents,
};
