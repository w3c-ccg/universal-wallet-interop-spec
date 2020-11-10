import React from 'react';
import Button from '@material-ui/core/Button';

import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';

import { Issue, FullscreenDialog } from '../../index';

import * as fixtures from '@w3c-ccg/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Issue,
};

const wallet = testWalletFactory.build({
  contents: fixtures.content,
});

export const _Issue = (props?: Partial<FullscreenDialog>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps: FullscreenDialog = {
    wallet,
    trigger: (
      <Button variant="outlined" color="primary">
        Open Issue Dialog
      </Button>
    ),
    dialogTitle: 'Issue',
    dialogSubmitTitle: 'Issue',
    handleSubmit: async (args: any) => {
      const keypair = wallet.contents.find((i: any) => {
        return i.id === args.verificationMethod;
      });
      const key = new Ed25519KeyPair(keypair);
      const suite = new Ed25519Signature2018({
        key,
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
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>Copy this content to issue</h3>
      <pre>{JSON.stringify(fixtures.credentials.vc_template, null, 2)}</pre>
      <Issue {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
