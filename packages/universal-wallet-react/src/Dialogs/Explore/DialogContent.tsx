import React from 'react';

import Grid from '@material-ui/core/Grid';

import { ContentTable } from '../../Tables/ContentTable';

export const DialogContent = ({ wallet }: any) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ContentTable rows={wallet.contents} />
        </Grid>
      </Grid>
    </div>
  );
};
