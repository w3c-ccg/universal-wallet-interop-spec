import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { LinkedDataIdentifier } from '@material-did/common';

import { throttle } from 'lodash-es';

export const DialogContent = ({ dialogState, setDialogState, wallet }: any) => {
  const throttledSetId = throttle(async (value: any) => {
    const seed = await wallet.passwordToKey(value);
    let seedId = await wallet.seedToId(seed);
    setDialogState({
      ...dialogState,
      seedId,
      seed: Buffer.from(seed).toString('hex'),
      password: value,
    });
  }, 1 * 1000);

  const handlePasswordChange = (event: any) => {
    throttledSetId(event.target.value);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={handlePasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <LinkedDataIdentifier value={dialogState.seedId} />
        </Grid>
      </Grid>
    </div>
  );
};
