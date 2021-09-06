import React from 'react';
import {ColorValue, Image, ImageProps} from 'react-native';

export interface TextProps extends ImageProps {
  tintColor?: ColorValue | string;
}

export default ({tintColor, style, ...props}: TextProps) => {
  return <Image style={[{tintColor}, style]} {...props} />;
};
