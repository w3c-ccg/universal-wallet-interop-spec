import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';
import {
  FullscreenDialog as Component,
  Props,
} from '../../../atoms/FullscreenDialog';
import { DialogContent } from './DialogContent';

import { wallet, seedToId, passwordToKey } from '../../../__fixtures__/wallet';

const meta: Meta = {
  title: 'Molecules/Dialogs/Generate',
  component: Component,
};

export default meta;

const Template: Story<Props> = (args) => <Component {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  trigger: <Button>trigger</Button>,
  dialogTitle: 'Generate',
  dialogSubmitTitle: 'Generate',
  dialogContent: (
    <DialogContent
      seedToId={seedToId}
      passwordToKey={passwordToKey}
      setDialogState={(state: any) => {
        action('setDialogState')(state);
      }}
    />
  ),
  handleSubmit: async (args: any) => {
    console.log(args);
    // const seed = await wallet.passwordToKey(args.password);
    // const content = await wallet.generateContentFromSeed(seed);
    // content.forEach((content: any) => {
    //   wallet.add(content);
    // });
    // setState({ wallet });
    action('handleSubmit')({ wallet });
  },
  handleCancel: async () => {
    action('handleCancel')();
    // console.log('storybook  handleCancel...');
  },
};
