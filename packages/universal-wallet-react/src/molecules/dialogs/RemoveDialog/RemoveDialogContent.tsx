import React, { FC, HTMLAttributes } from 'react';

import Grid from '@material-ui/core/Grid';

import { SelectByImage } from '../../../atoms/SelectByImage';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  options: any[];
  onChange: (selected: any) => void;
  value: any;
}

export const RemoveDialogContent: FC<Props> = ({
  options,
  onChange,
  value,
}) => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SelectByImage
            label={'Content to remove'}
            options={options}
            onChange={onChange}
            value={value}
          />
        </Grid>
      </Grid>
    </div>
  );
};
