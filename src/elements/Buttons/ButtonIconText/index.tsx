import Image from 'elements/Image';
import Text, {TextProps} from 'elements/Text';
import React, {memo} from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface ButtonTextProps {
  title?: string;
  borderColor?: ColorValue | string;
  icon?: ImageSourcePropType;
  tintColor?: string;
  style?: ViewStyle;
  iconStyle?: any;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
}

const ButtonIconText = memo(
  ({
    title,
    icon,
    style,
    tintColor,
    iconStyle,
    titleColor = colors.TealBlue,
    onPress,
    borderColor,
    ...textProps
  }: ButtonTextProps) => {
    return (
      <TouchableOpacity
        style={[styles.container, style, {borderColor: borderColor}]}
        onPress={onPress}
        activeOpacity={0.54}>
        {icon && (
          <Image tintColor={tintColor} style={[iconStyle]} source={icon} />
        )}
        <Text type="H5" color={titleColor} {...textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ButtonIconText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.center,
  },
});
