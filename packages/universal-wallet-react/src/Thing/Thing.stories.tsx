import React from 'react';
import { Thing, ThingProps } from '../index';

export default {
  title: 'Components/Thing',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<ThingProps>) => <Thing {...props} />;
