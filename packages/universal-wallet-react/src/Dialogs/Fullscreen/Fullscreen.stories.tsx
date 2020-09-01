import React from 'react';
import Button from '@material-ui/core/Button';
import { Fullscreen } from './Fullscreen';
import { DialogContent } from './DialogContent';

export default {
  title: 'Dialogs/Interface',
  component: Fullscreen,
};

export const _Fullscreen = (props?: Partial<any>) => {
  return (
    <div>
      <Fullscreen
        {...props}
        dialogTitle={'Fullscreen Dialog'}
        dialogSubmitTitle={'Save'}
        trigger={
          <Button variant="outlined" color="primary">
            Open full-screen dialog
          </Button>
        }
        handleCancel={() => {
          console.log('cancel handled...');
        }}
        handleSubmit={() => {
          console.log('submit handled...');
        }}
      >
        <DialogContent />
      </Fullscreen>
    </div>
  );
};
