import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';
import { JsonEditor } from '../../../atoms/JsonEditor';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onChange: (event: any) => any;
}

export const AddDialogContent: FC<Props> = ({ value, onChange }: any) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <JsonEditor value={value} onChange={onChange} />
        </Grid>
      </Grid>
    </div>
  );
};
