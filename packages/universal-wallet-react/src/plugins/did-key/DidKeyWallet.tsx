import React, { FC, HTMLAttributes } from 'react';

import { UniversalWalletCard } from '../../organisms/WalletCard/UniversalWalletCard';

import { wallet } from './wallet';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

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
        }
      }}
    />
  );
};
