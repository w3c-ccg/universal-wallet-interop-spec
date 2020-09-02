import React from 'react';
import Button from '@material-ui/core/Button';
import { Import, FullscreenDialog } from '../../index';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Import,
};

const wallet = testWalletFactory.build();

export const _Import = (props?: Partial<IImportProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open Import Dialog
      </Button>
    ),
    dialogTitle: 'Import',
    dialogSubmitTitle: 'Import',
    handleSubmit: async (args: any) => {
      const content = JSON.parse(args.editorValue);
      const password = args.password;
      console.log(password);
      await wallet.import(content, password);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
    seedToId: wallet.seedToId,
    passwordToKey: wallet.passwordToKey,
  };
  return (
    <div>
      <h3>password is {`"${fixtures.password}"`}</h3>
      <Import {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
