import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { ImportDialogContent } from './ImportDialogContent';

import { seedToId, passwordToKey } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Import/Dialog',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Dialog = Template.bind({});

Dialog.args = {
  dialogTrigger: <Button>trigger</Button>,
  dialogTitle: 'Import',
  dialogSubmitTitle: 'Import',
  dialogContent: (
    <ImportDialogContent
      seedToId={seedToId}
      passwordToKey={passwordToKey}
      setDialogState={(state: any) => {
        action('setDialogState')(state);
      }}
    />
  ),
  handleSubmit: async () => {
    action('handleSubmit')();
  },
  handleCancel: async () => {
    action('handleCancel')();
  },
};
