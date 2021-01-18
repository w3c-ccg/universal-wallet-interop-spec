import React from 'react';

import Grid from '@material-ui/core/Grid';

import { JSONEditor } from '@material-did/common';

export const DialogContent = ({ dialogState, setDialogState }: any) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <JSONEditor
            value={dialogState.editorValue}
            onChange={(editorValue: string) => {
              setDialogState({ ...dialogState, editorValue });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
