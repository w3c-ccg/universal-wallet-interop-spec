import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { ExploreDialogContent } from './ExploreDialogContent';

import { fullWallet } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Explore/Dialog',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Dialog = Template.bind({});

Dialog.args = {
  dialogTrigger: <Button>trigger</Button>,
  dialogTitle: 'Explore',
  dialogSubmitTitle: 'Explore',
  dialogContent: <ExploreDialogContent contents={fullWallet.contents} />,
  handleSubmit: async () => {
    action('handleSubmit')();
  },
  handleCancel: async () => {
    action('handleCancel')();
  },
};
