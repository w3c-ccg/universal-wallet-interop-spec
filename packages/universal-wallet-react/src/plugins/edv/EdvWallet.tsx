import React, { FC, HTMLAttributes } from 'react';

import { Ed25519KeyPair } from '@transmute/did-key-ed25519';
import { Ed25519Signature2018 } from '@transmute/ed25519-signature-2018';
import { UniversalWalletCard } from '../../organisms/WalletCard/UniversalWalletCard';

import { wallet } from './wallet';
import { documentLoader } from './documentLoader';
export interface Props extends HTMLAttributes<HTMLDivElement> {}

export const EdvWallet: FC<Props> = () => {
  const [state, setState] = React.useState({ wallet });
  const [loading, setLoading] = React.useState(false);
  return (
    <UniversalWalletCard
      image={
        'https://cdn.pixabay.com/photo/2017/01/22/22/11/cloud-computing-2001090_1280.jpg'
      }
      loading={loading}
      wallet={state.wallet}
      handleWalletOperation={async (
        operationId: string,
        operationInput: any
      ) => {
        switch (operationId) {
          case 'sync': {
            setLoading(true);
            const { edvEndpoint, password } = operationInput;
            const client = await wallet.vaultClientFromPassord(
              edvEndpoint,
              password
            );
            const contents = await client.syncContent(wallet);
            wallet.contents = contents;
            setState({
              wallet,
            });
            setLoading(false);
            break;
          }
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
