import React, { FC } from 'react';

import { FullscreenDialog, Props } from '../../../atoms/FullscreenDialog';

export const AddDialog: FC<Props> = (props) => {
  return <FullscreenDialog {...props} />;
};