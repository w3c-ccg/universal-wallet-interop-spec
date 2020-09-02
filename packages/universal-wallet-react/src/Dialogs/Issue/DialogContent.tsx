import React from 'react';

import Grid from '@material-ui/core/Grid';

import { JSONEditor } from '@material-did/common';

import { SelectByImage } from '@material-did/common';

export const DialogContent = ({ wallet, dialogState, setDialogState }: any) => {
  const options = wallet.contents
    .filter((content: any) => {
      return content.type === 'Ed25519VerificationKey2018';
    })
    .map((content: any) => {
      return {
        value: content.id,
        logo:
          content.image || 'https://issuer.interop.transmute.world/logo512.png',
        label: content.name || content.description || content.id,
      };
    });

  const [state, setState] = React.useState({
    options,
    selected: options[0],
  });

  const onChange = (option: any) => {
    setDialogState({ ...dialogState, verificationMethod: option.value });
  };

  const label = 'Select key to issue from';

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SelectByImage
            label={label}
            value={state.selected}
            options={state.options}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <JSONEditor
            value={dialogState.editorValue}
            onChange={(editorValue: string) => {
              setDialogState({
                ...dialogState,
                editorValue,
                verificationMethod: state.selected.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
