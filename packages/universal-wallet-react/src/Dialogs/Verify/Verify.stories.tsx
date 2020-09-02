import React from 'react';
import Button from '@material-ui/core/Button';

import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { Verify, FullscreenDialog } from '../../index';

import { testWalletFactory } from '../../__fixtures__';

export default {
  title: 'Dialogs/Interface',
  component: Verify,
};

const wallet = testWalletFactory.build();

export const _Verify = (props?: Partial<IVerifyProps>) => {
  const [state, setState] = React.useState({
    wallet,
  });
  const dialogProps = {
    trigger: (
      <Button variant="outlined" color="primary">
        Open Verify Dialog
      </Button>
    ),
    dialogTitle: 'Verify',
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

      console.log(verification);

      if (verification.verified) {
        wallet.add(content);
      }
      setState({ wallet });
    },
    handleCancel: async (args: any) => {
      console.log('storybook handleCancel dialog canceled...');
    },
  };
  return (
    <div>
      <h3>Copy this content to verify</h3>
      <pre>{JSON.stringify(fixtures.credentials.ldp_vc, null, 2)}</pre>
      <Verify {...dialogProps} />
      <pre>{JSON.stringify(state.wallet, null, 2)}</pre>
    </div>
  );
};
