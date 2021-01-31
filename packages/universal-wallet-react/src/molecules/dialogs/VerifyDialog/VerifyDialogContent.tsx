import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { JsonEditor } from '../../../atoms/JsonEditor';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  dialogState: any;
  setDialogState: any;
}

export const VerifyDialogContent: FC<Props> = ({
  dialogState,
  setDialogState,
}) => {
  const [editor, setEditorValue] = React.useState('');

  const handleEditorChange = (value: any) => {
    setEditorValue(value);
    setDialogState({
      editor: value,
    });
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField
            label="Domain"
            fullWidth
            value={dialogState.domain}
            onChange={(event: any) => {
              setDialogState({
                domain: event.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Challenge"
            fullWidth
            value={dialogState.challenge}
            onChange={(event: any) => {
              setDialogState({
                challenge: event.target.value,
              });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <JsonEditor value={editor} onChange={handleEditorChange} />
        </Grid>
      </Grid>
    </div>
  );
};
