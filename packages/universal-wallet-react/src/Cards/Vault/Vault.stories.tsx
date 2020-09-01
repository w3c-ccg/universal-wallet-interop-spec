import React from 'react';

import { Vault, VaultProps } from '../../index';

export default {
  title: 'Cards',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const _Vault = (props?: Partial<VaultProps>) => {
  const image =
    'https://cdn.pixabay.com/photo/2016/03/07/17/47/background-1242666_1280.jpg';

  return (
    <div>
      <Vault image={image} {...props} />{' '}
    </div>
  );
};
