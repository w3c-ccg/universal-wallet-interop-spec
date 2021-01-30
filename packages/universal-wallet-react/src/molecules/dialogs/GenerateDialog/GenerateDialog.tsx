import React, { FC, HTMLAttributes, ReactChild } from 'react';

import { FullscreenDialog, Props } from '../../../atoms/FullscreenDialog';

export const GenerateDialog: FC<Props> = (props) => {
  return <FullscreenDialog {...props} />;
};
