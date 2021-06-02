import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextProps} from 'react-native';
import {useSelector} from 'react-redux';
import {LanguagesReducer} from 'middlewares/reducers/language';
import sizes from 'res/sizes';
interface Props extends TextProps {
  children?: React.ReactNode;
  text?: string;
  style?: StyleProp<TextStyle>;
}

const TextBase = ({children, text, style, ...props}: Props) => {
  return (
    <Text style={[styles.txt, style]} allowFontScaling={false} {...props}>
      {text ? text : children}
    </Text>
  );
};
export default TextBase;

const styles = StyleSheet.create({
  txt: {
    fontSize: sizes._14sdp,
  },
});
