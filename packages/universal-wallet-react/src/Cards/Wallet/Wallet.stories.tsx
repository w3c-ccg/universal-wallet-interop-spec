import React from 'react';
import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

import { Wallet, WalletProps } from '../../index';

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Generate } from '../../Dialogs/Generate';
import { Lock } from '../../Dialogs/Lock';
import { Unlock } from '../../Dialogs/Unlock';

export default {
  title: 'Cards/Wallet',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Unlocked = (props?: Partial<WalletProps>) => {
  const [state, setState] = React.useState({
    wallet: null,
  });

  React.useEffect(() => {
    const wallet: any = testWalletFactory.build({
      ...fixtures.wallet_unlocked,
    });
    setState({ wallet });
  }, []);

  if (!state.wallet) {
    return 'Loading...';
  }

  const image =
    'https://cdn.pixabay.com/photo/2017/08/22/11/08/wallet-2668577_1280.jpg';

  let wallet: any = state.wallet;

  const menu = [
    {
      title: 'Generate',
      disabledWhenStatus: ['LOCKED'],
      icon: CreateNewFolderIcon,
      iconProps: {},
      dialog: Generate,
      dialogProps: {
        dialogTitle: 'Generate',
        dialogSubmitTitle: 'Generate',
        seedToId: wallet.seedToId,
        passwordToKey: wallet.passwordToKey,
        handleSubmit: async (args: any) => {
          const seed = await wallet.passwordToKey(args.password);
          const content = await wallet.generateContentFromSeed(seed);
          content.forEach((content: any) => {
            wallet.add(content);
          });
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Lock',
      disabledWhenStatus: ['LOCKED'],
      icon: LockIcon,
      iconProps: {},
      dialog: Lock,
      dialogProps: {
        dialogTitle: 'Lock Wallet',
        dialogSubmitTitle: 'Lock',
        seedToId: wallet.seedToId,
        passwordToKey: wallet.passwordToKey,
        handleSubmit: async (args: any) => {
          await wallet.lock(args.password);
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Unlock',
      disabledWhenStatus: ['UNLOCKED'],
      icon: LockOpenIcon,
      iconProps: {},
      dialog: Unlock,
      dialogProps: {
        dialogTitle: 'Unlock Wallet',
        dialogSubmitTitle: 'Unlock',
        seedToId: wallet.seedToId,
        passwordToKey: wallet.passwordToKey,
        handleSubmit: async (args: any) => {
          await wallet.unlock(args.password);
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
  ];

  return (
    <div>
      <Wallet image={image} wallet={state.wallet} menu={menu} {...props} />
      <pre>{JSON.stringify(wallet, null, 2)}</pre>
    </div>
  );
};
