import React from 'react';

import { Vault, VaultProps } from '../../index';

import { storageImage } from '../../images';

export default {
  title: 'Cards',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const _Vault = (props?: Partial<VaultProps>) => {
  return (
    <div>
      <Vault image={storageImage} {...props} />{' '}
    </div>
  );
};
