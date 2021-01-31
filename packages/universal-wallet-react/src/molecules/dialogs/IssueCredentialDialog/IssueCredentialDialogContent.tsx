import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import { JsonEditor } from '../../../atoms/JsonEditor';

import { SelectByImage } from '../../../atoms/SelectByImage';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  setDialogState: any;
  options: any;
}

export const IssueCredentialDialogContent: FC<Props> = ({
  options,
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
        <Grid item xs={12}>
          <JsonEditor value={editor} onChange={handleEditorChange} />
        </Grid>
      </Grid>
    </div>
  );
};
