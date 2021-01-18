import React, { FC, HTMLAttributes } from 'react';

import Card from './Card';

export interface WalletProps extends HTMLAttributes<HTMLDivElement> {
  wallet: any;
  image: string;
  menu: any;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Wallet: FC<WalletProps> = ({ wallet, image, menu }) => {
  return (
    <div>
      <Card status={wallet.status} image={image} menu={menu} />
    </div>
  );
};
