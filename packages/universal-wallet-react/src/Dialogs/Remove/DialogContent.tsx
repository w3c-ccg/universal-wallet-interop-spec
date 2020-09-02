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

  const [state, setState] = React.useState({
    options: options,
    selected: options[0],
  } as any);

  const onChange = (value: string) => {
    setState({
      ...state,
      selected: state.options.find((i: any) => {
        return i.value === value;
      }),
    });

    setDialogState({ ...dialogState, idToRemove: value });
  };

  React.useEffect(() => {
    if (
      dialogState.idToRemove === '' ||
      !state.options.find((i: any) => {
        return i.value === dialogState.idToRemove;
      })
    ) {
      setDialogState({
        ...dialogState,
        idToRemove: state.selected.value,
      });
    }
  }, [wallet]);

  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SelectByImage
            label={'Select content to remove'}
            value={state.selected}
            options={state.options}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};
