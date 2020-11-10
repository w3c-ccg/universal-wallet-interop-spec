import React from 'react';
import Button from '@material-ui/core/Button';
import { Export, FullscreenDialog } from '../../index';

import * as fixtures from '@w3c-ccg/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

import { download } from '../../utils';

export default {
  title: 'Dialogs/Interface',
  component: Export,
};

const wallet = testWalletFactory.build({
  ...fixtures.wallet_unlocked,
});

export const _Export = (props?: Partial<FullscreenDialog>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps: FullscreenDialog = {
    wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open Export Dialog
      </Button>
    ),
    dialogTitle: 'Export',
    dialogSubmitTitle: 'Export',
    handleSubmit: async (args: any) => {
      const exported = await wallet.export(args.password);
      download('wallet.json', JSON.stringify(exported, null, 2));
      setState({ ...state, wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <Export {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
