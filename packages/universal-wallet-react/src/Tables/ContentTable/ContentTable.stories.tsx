import React from 'react';
import * as fixtures from '@transmute/universal-wallet-test-vectors';

import { testWalletFactory } from '../../__fixtures__';

import { ContentTable } from '../../index';

export default {
  title: 'Tables/Explore',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Content = (props?: Partial<any>) => {
  const [state, setState] = React.useState({
    wallet: null,
  });

  React.useEffect(() => {
    const wallet: any = testWalletFactory.build({
      contents: fixtures.content,
    });
    setState({ wallet });
  }, []);

  if (!state.wallet) {
    return 'Loading...';
  }

  let wallet: any = state.wallet;

  return (
    <div>
      <ContentTable rows={wallet.contents} {...props} />
    </div>
  );
};
