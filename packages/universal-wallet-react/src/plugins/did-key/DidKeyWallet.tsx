import { walletFactory } from '@transmute/universal-wallet';
import React, { FC, HTMLAttributes } from 'react';

import { UniversalWalletCard } from '../../organisms/WalletCard/UniversalWalletCard';

import { wallet } from './wallet';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

const download = (filename: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const DidKeyWallet: FC<Props> = () => {
  const [state, setState] = React.useState({ wallet });
  return (
    <UniversalWalletCard
      wallet={state.wallet}
      handleWalletOperation={async (
        operationId: string,
        operationInput: any
      ) => {
        switch (operationId) {
          case 'generate': {
            const contents = await wallet.generateContentFromSeed(
              Buffer.from(operationInput.seed, 'hex')
            );
            contents.forEach((content: any) => {
              wallet.add(content);
            });
            setState({
              wallet,
            });
            break;
          }
          case 'export': {
            const exportedVc = await wallet.export(operationInput.password);

            download(
              'exported-wallet.json',
              JSON.stringify(exportedVc, null, 2)
            );

            setState({
              wallet,
            });
            break;
          }
          case 'import': {
            const { contents } = await wallet.import(
              operationInput.encryptedWalletCredential,
              operationInput.password
            );

            wallet.contents = contents;

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
