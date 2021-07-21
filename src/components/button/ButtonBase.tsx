import TextBase from 'components/text/TextBase';
import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import colors from 'res/colors';
import sizes from 'res/sizes';

interface ButtonBaseProps extends TouchableOpacityProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconLeft?: ImageSourcePropType;
  iconRight?: ImageSourcePropType;
  iconLeftStyle?: StyleProp<ImageStyle>;
  iconRightStyle?: StyleProp<ImageStyle>;
}

const ButtonBase = ({
  text,
  style,
  textStyle,
  iconLeft,
  iconRight,
  iconLeftStyle,
  iconRightStyle,
  ...props
}: ButtonBaseProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      {!!iconLeft && (
        <Image source={iconLeft} style={[styles.icon, iconLeftStyle]} />
      )}
      {!!text && <TextBase style={[styles.txt, textStyle]}>{text}</TextBase>}
      {!!iconRight && (
        <Image source={iconRight} style={[styles.icon, iconRightStyle]} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonBase;

const styles = StyleSheet.create({
  icon: {
    height: sizes._20sdp,
    width: sizes._20sdp,
    resizeMode: 'contain',
  },
  txt: {
    color: colors.white,
    fontWeight: '600',
    fontSize: sizes._18sdp,
  },
  container: {
    padding: sizes._10sdp,
    // backgroundColor: colors.buttonColor,
    alignSelf: 'center',
    borderRadius: sizes._5sdp,
    // width: sizes._256sdp,
    // height: sizes._56sdp,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
