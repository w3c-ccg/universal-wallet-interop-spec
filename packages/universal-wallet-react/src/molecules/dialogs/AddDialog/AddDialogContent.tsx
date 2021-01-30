import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';

import { WalletContentTable } from '../../tables/ContentTable/WalletContentTable';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  contents: any[];
}
export const AddDialogContent: FC<Props> = ({ contents }: any) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <WalletContentTable rows={contents} />
        </Grid>
      </Grid>
    </div>
  );
};
