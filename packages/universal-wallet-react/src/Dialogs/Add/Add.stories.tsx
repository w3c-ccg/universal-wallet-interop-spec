import React from 'react';
import Button from '@material-ui/core/Button';
import { Add, FullscreenDialog } from '../../index';

import * as fixtures from '@w3c-ccg/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Add,
};

const wallet = testWalletFactory.build();

export const _Add = (props?: Partial<FullscreenDialog>) => {
  const [state, setState] = React.useState({
    wallet,
  });

  const dialogProps: FullscreenDialog = {
    wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open Add Dialog
      </Button>
    ),
    dialogTitle: 'Add',
    dialogSubmitTitle: 'Add',
    handleSubmit: async (args: any) => {
      const content = JSON.parse(args.editorValue);
      wallet.add(content);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>Copy this content to add</h3>
      <pre>{JSON.stringify(fixtures.credentials.ldp_vc, null, 2)}</pre>
      <Add {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
