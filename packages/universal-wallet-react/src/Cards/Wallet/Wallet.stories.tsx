import React from 'react';
import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';

import { testWalletFactory } from '../../__fixtures__';

import { Wallet, WalletProps } from '../../index';

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CreateIcon from '@material-ui/icons/Create';

import { Generate } from '../../Dialogs/Generate';
import { Lock } from '../../Dialogs/Lock';
import { Unlock } from '../../Dialogs/Unlock';
import { Add } from '../../Dialogs/Add';
import { Remove } from '../../Dialogs/Remove';
import { Export } from '../../Dialogs/Export';
import { Import } from '../../Dialogs/Import';
import { Verify } from '../../Dialogs/Verify';
import { Issue } from '../../Dialogs/Issue';

import { download } from '../../utils';

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
      // ...fixtures.wallet_unlocked,
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
      disabledWhen: () => {
        return wallet.status === 'LOCKED';
      },
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
      disabledWhen: () => {
        return wallet.status === 'LOCKED';
      },
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
      disabledWhen: () => {
        return wallet.status === 'UNLOCKED';
      },
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
    {
      title: 'Add',
      disabledWhen: () => {
        return wallet.status === 'LOCKED';
      },
      icon: AddIcon,
      iconProps: {},
      dialog: Add,
      dialogProps: {
        dialogTitle: 'Add Content',
        dialogSubmitTitle: 'Add',
        handleSubmit: async (args: any) => {
          const content = JSON.parse(args.editorValue);
          wallet.add(content);
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Remove',
      disabledWhen: () => {
        return wallet.status === 'LOCKED' || wallet.contents.length === 0;
      },
      icon: RemoveIcon,
      iconProps: {},
      dialog: Remove,
      dialogProps: {
        wallet: wallet,
        dialogTitle: 'Remove Content',
        dialogSubmitTitle: 'Remove',
        handleSubmit: async (args: any) => {
          const { idToRemove } = args;
          wallet.remove(idToRemove);
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Export',
      disabledWhen: () => {
        return wallet.status === 'LOCKED' || wallet.contents.length === 0;
      },
      icon: ArchiveIcon,
      iconProps: {},
      dialog: Export,
      dialogProps: {
        seedToId: wallet.seedToId,
        passwordToKey: wallet.passwordToKey,
        dialogTitle: 'Export Content',
        dialogSubmitTitle: 'Export',
        handleSubmit: async (args: any) => {
          const exported = await wallet.export(args.password);
          download('wallet.json', JSON.stringify(exported, null, 2));
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },

    {
      title: 'Import',
      disabledWhen: () => {
        return wallet.status === 'LOCKED';
      },
      icon: UnarchiveIcon,
      iconProps: {},
      dialog: Import,
      dialogProps: {
        seedToId: wallet.seedToId,
        passwordToKey: wallet.passwordToKey,
        dialogTitle: 'Import Content',
        dialogSubmitTitle: 'Import',
        handleSubmit: async (args: any) => {
          const content = JSON.parse(args.editorValue);
          const password = args.password;
          console.log(password);
          await wallet.import(content, password);
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Verify',
      disabledWhen: () => {
        return wallet.status === 'LOCKED';
      },
      icon: VerifiedUserIcon,
      iconProps: {},
      dialog: Verify,
      dialogProps: {
        dialogTitle: 'Verify Content',
        dialogSubmitTitle: 'Verify',
        handleSubmit: async (args: any) => {
          const content = JSON.parse(args.editorValue);
          const verification = await wallet.verifyCredential({
            credential: content,
            options: {
              // verification uses document loader to get key material
              suite: new Ed25519Signature2018({}),
              documentLoader: fixtures.documentLoader,
            },
          });

          if (verification.verified) {
            wallet.add(content);
          }
          setState({ wallet });
        },
        handleCancel: async () => {
          console.log('storybook  handleCancel...');
        },
      },
    },
    {
      title: 'Issue',
      disabledWhen: () => {
        const signingKeys = wallet.contents.find((i: any) => {
          return i.type === 'Ed25519VerificationKey2018';
        });

        return wallet.status === 'LOCKED' || !signingKeys;
      },
      icon: CreateIcon,
      iconProps: {},
      dialog: Issue,
      dialogProps: {
        wallet: wallet,
        dialogTitle: 'Issue Content',
        dialogSubmitTitle: 'Issue',
        handleSubmit: async (args: any) => {
          const keypair = wallet.contents.find((i: any) => {
            return i.id === args.verificationMethod;
          });
          const key = new Ed25519KeyPair(keypair);
          const suite = new Ed25519Signature2018({
            key,
            date: '2020-03-10T04:24:12.164Z',
          });
          const vc = await wallet.issue({
            credential: JSON.parse(args.editorValue),
            options: {
              suite,
              documentLoader: fixtures.documentLoader,
            },
          });
          wallet.add(vc);
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