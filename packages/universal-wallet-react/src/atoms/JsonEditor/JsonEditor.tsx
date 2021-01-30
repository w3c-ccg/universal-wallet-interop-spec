import React, { FC, HTMLAttributes } from 'react';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

const AceEditor = require('react-ace').default;

export interface Props extends HTMLAttributes<HTMLDivElement> {
  value: any;
  onChange?: any;
  style?: any;
}

export const JsonEditor: FC<Props> = ({ value, onChange, style }) => {
  return (
    <AceEditor
      mode="json"
      theme="github"
      style={{ ...style, width: '100%' }}
      onChange={(data: string) => {
        if (onChange) {
          onChange(data);
        }
      }}
      readOnly={onChange === undefined}
      wrapEnabled={true}
      name="JSONEditorEditor"
      value={value}
      editorProps={{ $blockScrolling: true }}
    />
  );
};
