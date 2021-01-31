import React, { FC, HTMLAttributes } from 'react';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { UniversalWalletCard } from '../../organisms/WalletCard/UniversalWalletCard';

import { wallet } from './wallet';
import { documentLoader } from './documentLoader';
export interface Props extends HTMLAttributes<HTMLDivElement> {}

export const VcWallet: FC<Props> = () => {
  const [state, setState] = React.useState({ wallet });
  return (
    <UniversalWalletCard
      wallet={state.wallet}
      handleWalletOperation={async (
        operationId: string,
        operationInput: any
      ) => {
        switch (operationId) {
          case 'issue': {
            const { credential } = operationInput;
            const key = await Ed25519KeyPair.from(operationInput.keypair);
            const suite = new Ed25519Signature2018({ key });
            const vc = await wallet.issue({
              credential,
              options: {
                suite,
                documentLoader,
              },
            });
            wallet.add(vc);

            setState({
              wallet,
            });
            break;
          }
        }
      }}
    />
  );
};
