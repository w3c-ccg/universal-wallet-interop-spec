import React from 'react';

import Grid from '@material-ui/core/Grid';

import { SelectByImage } from '@material-did/common';

export const DialogContent = ({ wallet, dialogState, setDialogState }: any) => {
  const options = wallet.contents.map((content: any) => {
    return {
      value: content.id,
      logo:
        content.image || 'https://issuer.interop.transmute.world/logo512.png',
      label: content.description || content.name || content.id,
    };
  });

  const value = options[0];

  const label = 'Select content to remove';
  const onChange = (option: any) => {
    setDialogState({ ...dialogState, idToRemove: option.value });
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SelectByImage
            label={label}
            value={value}
            options={options}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};
