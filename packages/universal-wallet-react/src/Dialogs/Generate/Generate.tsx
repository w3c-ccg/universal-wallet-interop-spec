import React from 'react';

import { Fullscreen } from '../Fullscreen';
import { DialogContent } from './DialogContent';

export interface IGenerateProps {
  trigger: any;
  dialogTitle: any;
  dialogSubmitTitle: any;
  handleCancel: any;
  handleSubmit: any;
}

export const Generate = ({
  trigger,
  dialogTitle,
  dialogSubmitTitle,
  handleCancel,
  handleSubmit,
  passwordToKey,
  seedToId,
}: any) => {
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
          passwordToKey={passwordToKey}
          seedToId={seedToId}
        />
      </Fullscreen>
    </div>
  );
};
