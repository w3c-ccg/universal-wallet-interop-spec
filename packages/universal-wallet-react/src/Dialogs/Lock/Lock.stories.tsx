import React from 'react';
import Button from '@material-ui/core/Button';
import { Lock, FullscreenDialog } from '../../index';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Lock,
};

const wallet = testWalletFactory.build({
  ...fixtures.wallet_unlocked,
});

export const _Lock = (props?: Partial<ILockProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open Lock Dialog
      </Button>
    ),
    dialogTitle: 'Lock',
    dialogSubmitTitle: 'Lock',
    seedToId: wallet.seedToId,
    passwordToKey: wallet.passwordToKey,
    handleSubmit: async (args: any) => {
      await wallet.lock(args.password);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <Lock {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
