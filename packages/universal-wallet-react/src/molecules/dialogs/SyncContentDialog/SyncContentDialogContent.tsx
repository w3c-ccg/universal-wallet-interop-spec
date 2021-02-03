import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  dialogState: any;
  setDialogState: any;
}

export const SyncContentDialogContent: FC<Props> = ({
  dialogState,
  setDialogState,
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Endpoint"
            fullWidth
            value={dialogState.edvEndpoint}
            onChange={(event: any) => {
              setDialogState({
                edvEndpoint: event.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Filter"
            fullWidth
            value={dialogState.edvFilter}
            onChange={(event: any) => {
              setDialogState({
                edvFilter: event.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            value={dialogState.password}
            onChange={(event: any) => {
              setDialogState({
                password: event.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
