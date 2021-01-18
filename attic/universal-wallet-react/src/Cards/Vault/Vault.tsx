import React, { FC, HTMLAttributes } from 'react';

import Card from './Card';

export interface VaultProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Vault: FC<VaultProps> = ({ image }) => {
  return (
    <div>
      <Card image={image} />
    </div>
  );
};
