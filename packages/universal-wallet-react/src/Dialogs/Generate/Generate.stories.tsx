import React from 'react';
import Button from '@material-ui/core/Button';
import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Generate, FullscreenDialog } from '../../index';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Generate,
};

const wallet = testWalletFactory.build();

export const _Generate = (props?: Partial<FullscreenDialog>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps: FullscreenDialog = {
    wallet: wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open full-screen dialog
      </Button>
    ),
    dialogTitle: 'Generate',
    dialogSubmitTitle: 'Generate',
    handleSubmit: async (args: any) => {
      const seed = await wallet.passwordToKey(args.password);
      const content = await wallet.generateContentFromSeed(seed);
      wallet.add(content[0]);
      setState({ wallet });
    },
    handleCancel: async (_args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>use password {`"${fixtures.password}"`}</h3>
      <Generate {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
