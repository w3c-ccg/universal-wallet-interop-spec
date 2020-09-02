import React from 'react';
import Button from '@material-ui/core/Button';
import { Explore, IExploreProps } from '.';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Explore,
};

const wallet = testWalletFactory.build({
  contents: fixtures.content,
});

export const _Explore = (props?: Partial<IExploreProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open Explore Dialog
      </Button>
    ),
    dialogTitle: 'Explore',
    dialogSubmitTitle: 'Explore',
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
      <Explore {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
