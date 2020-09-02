import React from 'react';

import { Fullscreen } from '../Fullscreen';
import { DialogContent } from './DialogContent';

import { FullscreenDialog } from '../../types';

export const Generate = ({
  trigger,
  dialogTitle,
  dialogSubmitTitle,
  handleCancel,
  handleSubmit,
  wallet,
}: FullscreenDialog) => {
  const [dialogState, setDialogState] = React.useState({
    password: '',
    seed: '',
    seedId: '',
  });
  return (
    <div>
      <Fullscreen
        trigger={trigger}
        dialogTitle={dialogTitle}
        dialogSubmitTitle={dialogSubmitTitle}
        handleCancel={handleCancel}
        handleSubmit={() => {
          handleSubmit(dialogState);
        }}
      >
        <DialogContent
          dialogState={dialogState}
          setDialogState={setDialogState}
          wallet={wallet}
        />
      </Fullscreen>
    </div>
  );
};
