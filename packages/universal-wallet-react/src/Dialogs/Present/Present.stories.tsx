import React from 'react';
import Button from '@material-ui/core/Button';

import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { Ed25519KeyPair } from '@transmute/did-key-ed25519';

import { Present, FullscreenDialog } from '../../index';

import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Present,
};

const wallet = testWalletFactory.build({
  contents: fixtures.content,
});

export const _Present = (props?: Partial<IPresentProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open Present Dialog
      </Button>
    ),
    dialogTitle: 'Present',
    dialogSubmitTitle: 'Present',
    wallet,
    handleSubmit: async (args: any) => {
      const keypair = wallet.contents.find((i: any) => {
        return i.id === args.verificationMethod;
      });
      const key = new Ed25519KeyPair(keypair);
      const suite = new Ed25519Signature2018({
        key,
      });
      const verifiableCredential = JSON.parse(args.editorValue);

      let vpOpts: any = {};
      if (args.domain != '') {
        vpOpts.domain = args.domain;
      }
      if (args.challenge != '') {
        vpOpts.challenge = args.challenge;
      }
      const presentation = await wallet.createVerifiablePresentation({
        verifiableCredential: [verifiableCredential],
        options: {
          ...vpOpts,
          suite,
          documentLoader: fixtures.documentLoader,
        },
      });
      wallet.add(presentation);
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>Copy this content to present</h3>
      <pre>{JSON.stringify(fixtures.credentials.ldp_vc, null, 2)}</pre>
      <Present {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
