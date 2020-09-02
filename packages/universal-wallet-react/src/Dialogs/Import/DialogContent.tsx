import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { JSONEditor } from '@material-did/common';

import { LinkedDataIdentifier } from '@material-did/common';

import { throttle } from 'lodash-es';

export const DialogContent = ({
  dialogState,
  setDialogState,
  seedToId,
  passwordToKey,
}: any) => {
  const throttledSetId = throttle(async (value: any) => {
    const seed = await passwordToKey(value);
    let seedId = await seedToId(seed);
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

  const handleFile = (e: any) => {
    const content = e.target.result;
    setDialogState({ ...dialogState, editorValue: content });
  };

  const handleChangeFile = (file: any) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button
            variant={'contained'}
            onClick={() => {
              (document as any).getElementById('file-reader').click();
            }}
          >
            Import File
            <input
              id="file-reader"
              style={{ display: 'none' }}
              type="file"
              accept=".json"
              onChange={(e: any) => handleChangeFile(e.target.files[0])}
            />
          </Button>
        </Grid>
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
        <Grid item xs={12}>
          <JSONEditor value={dialogState.editorValue} />
        </Grid>
      </Grid>
    </div>
  );
};
