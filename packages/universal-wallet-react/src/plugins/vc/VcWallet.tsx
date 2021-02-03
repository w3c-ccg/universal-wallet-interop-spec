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
      loading={false}
      image={
        'https://cdn.pixabay.com/photo/2018/07/14/11/28/network-3537389_1280.jpg'
      }
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
          case 'present': {
            const { verifiableCredential, domain, challenge } = operationInput;
            const key = await Ed25519KeyPair.from(operationInput.keypair);
            const suite = new Ed25519Signature2018({ key });

            const vp = await wallet.createVerifiablePresentation({
              verifiableCredential,
              options: {
                holder: key.controller,
                domain,
                challenge,
                suite,
                documentLoader,
              },
            });
            wallet.add(vp);

            setState({
              wallet,
            });
            break;
          }
          case 'verify': {
            const { content, domain, challenge } = operationInput;
            let verification = { verified: false };
            const suite = new Ed25519Signature2018();
            const options = { suite, documentLoader };
            if (content.type.includes('VerifiableCredential')) {
              verification = await wallet.verifyCredential({
                credential: content,
                options,
              });
            }

            if (content.type.includes('VerifiablePresentation')) {
              verification = await wallet.verifyPresentation({
                presentation: content,
                options: {
                  ...options,
                  domain,
                  challenge,
                },
              });
            }

            if (verification.verified) {
              alert('success');
            } else {
              console.log(verification);
              alert('failure');
            }

            break;
          }
        }
      }}
    />
  );
};
