import React, { FC, HTMLAttributes } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Identicon from 'react-identicons';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onClick?: any;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const LinkedDataIdentifier: FC<Props> = ({ value, onClick }) => {
  return (
    <Tooltip title={value}>
      <Chip
        size="medium"
        variant="outlined"
        icon={
          <span
            style={{ height: '32px', marginLeft: '14px', marginTop: '0px' }}
          >
            <Identicon size={32} count={5} string={value} />
          </span>
        }
        style={{ maxWidth: '224px' }}
        label={value}
        onClick={onClick}
      />
    </Tooltip>
  );
};
