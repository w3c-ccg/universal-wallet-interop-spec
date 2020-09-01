import React from 'react';
import Button from '@material-ui/core/Button';
import { Generate, IGenerateProps } from '.';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Generate,
};

const wallet = testWalletFactory.build();

export const _Generate = (props?: Partial<IGenerateProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open full-screen dialog
      </Button>
    ),
    dialogTitle: 'Generate',
    dialogSubmitTitle: 'Generate',
    seedToId: wallet.seedToId,
    passwordToKey: wallet.passwordToKey,
    handleSubmit: async (args: any) => {
      const seed = await wallet.passwordToKey(args.password);
      const content = await wallet.generateContentFromSeed(seed);
      wallet.add(content[0]);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <Generate {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
