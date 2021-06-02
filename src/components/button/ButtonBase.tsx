import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import colors from 'res/colors';
import sizes from 'res/sizes';

interface ButtonBaseProps extends TouchableOpacityProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonBase = ({text, style, textStyle, ...props}: ButtonBaseProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={[styles.txt, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBase;

const styles = StyleSheet.create({
  txt: {
    color: colors.white,
    fontWeight: '600',
    fontSize: sizes._18sdp,
  },
  container: {
    padding: sizes._10sdp,
    backgroundColor: colors.buttonColor,
    alignSelf: 'center',
    borderRadius: sizes._5sdp,
    width: sizes._256sdp,
    height: sizes._56sdp,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
