import React from 'react';
import Button from '@material-ui/core/Button';
import { Remove, FullscreenDialog } from '../../index';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Remove,
};

const wallet = testWalletFactory.build({
  ...fixtures.wallet_unlocked,
});

export const _Remove = (props?: Partial<FullscreenDialog>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    wallet: state.wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open Remove Dialog
      </Button>
    ),
    dialogTitle: 'Remove',
    dialogSubmitTitle: 'Remove',
    handleSubmit: async (args: any) => {
      const { idToRemove } = args;
      wallet.remove(idToRemove);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>Copy this id to remove</h3>
      <pre>{JSON.stringify(fixtures.credentials.ldp_vc.id, null, 2)}</pre>
      <Remove {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
