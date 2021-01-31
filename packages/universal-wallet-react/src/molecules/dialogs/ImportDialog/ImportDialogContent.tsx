import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import { JsonEditor } from '../../../atoms/JsonEditor';

import TextField from '@material-ui/core/TextField';

import { LinkedDataIdentifier } from '../../../atoms/LinkedDataIdentifier';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  setDialogState: any;
  passwordToKey: any;
  seedToId: any;
}

export const ImportDialogContent: FC<Props> = ({
  seedToId,
  passwordToKey,
  setDialogState,
}: any) => {
  const [seedId, setSeedId] = React.useState('');
  const [editor, setEditorValue] = React.useState('');

  const handlePasswordChange = async (event: any) => {
    const password = event.target.value;
    const seed = await passwordToKey(password);
    let seedId = await seedToId(seed);

    setSeedId(seedId);
    setDialogState({
      seedId,
      seed: Buffer.from(seed).toString('hex'),
      password: password,
    });
  };
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            label="Password"
            type="password"
            inputProps={{
              autoComplete: 'new-password',
            }}
            fullWidth
            onChange={(event) => {
              handlePasswordChange(event);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LinkedDataIdentifier value={seedId} />
        </Grid>
        <Grid item xs={12}>
          <JsonEditor value={editor} onChange={setEditorValue} />
        </Grid>
      </Grid>
    </div>
  );
};
