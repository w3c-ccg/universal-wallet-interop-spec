import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { JsonEditor } from '../../../atoms/JsonEditor';

import { SelectByImage } from '../../../atoms/SelectByImage';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  dialogState: any;
  setDialogState: any;
  options: any;
}

export const CreateVerifiablePresentationDialogContent: FC<Props> = ({
  options,
  dialogState,
  setDialogState,
}) => {
  const [editor, setEditorValue] = React.useState('');

  const [selected, setSelected] = React.useState(options[0]);

  const handleEditorChange = (value: any) => {
    setEditorValue(value);
    setDialogState({
      selected: selected,
      editor: value,
    });
  };

  const handleKeySelection = (value: any) => {
    setDialogState({
      selected: value,
    });
    setSelected(value);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SelectByImage
            label={'Signing Key'}
            options={options}
            onChange={handleKeySelection}
            value={selected}
          />
        </Grid>

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
