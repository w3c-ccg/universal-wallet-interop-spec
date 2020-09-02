import React from 'react';

import { Fullscreen } from '../Fullscreen';
import { DialogContent } from './DialogContent';

import { FullscreenDialog } from '../../types';

export const Explore = ({
  trigger,
  dialogTitle,
  dialogSubmitTitle,
  handleCancel,
  handleSubmit,
  wallet,
}: FullscreenDialog) => {
  const [dialogState, setDialogState] = React.useState({});
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
