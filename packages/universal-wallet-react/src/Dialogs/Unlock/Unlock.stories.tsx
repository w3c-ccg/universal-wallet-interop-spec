import React from 'react';
import Button from '@material-ui/core/Button';
import { Unlock, FullscreenDialog } from '../../index';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Unlock,
};

const wallet = testWalletFactory.build({
  ...fixtures.wallet_locked,
});

export const _Unlock = (props?: Partial<IUnlockProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open Unlock Dialog
      </Button>
    ),
    dialogTitle: 'Unlock',
    dialogSubmitTitle: 'Unlock',
    seedToId: wallet.seedToId,
    passwordToKey: wallet.passwordToKey,
    handleSubmit: async (args: any) => {
      await wallet.unlock(args.password);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>password is {`"${fixtures.password}"`}</h3>
      <Unlock {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
