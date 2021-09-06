import {useTheme} from 'configs/ChangeTheme';
import Text, {TextProps} from 'elements/Text';
import React, {memo} from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';

interface ButtonTextProps extends TextProps {
  title?: string;
  style?: ViewStyle;
  titleColor?: string;
  textProps?: TextProps;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  marginLeft?: number;
  backgroundColor?: ColorValue | string;
  white?: boolean;
  hilight?: boolean;
  blueLight?: boolean;
  disabled?: boolean;
}

const ButtonText = memo(
  ({
    backgroundColor,
    title,
    style,
    titleColor = colors.DodgerBlue,
    onPress,
    borderColor,
    marginLeft,
    white,
    blueLight,
    hilight,
    disabled,
    ...textProps
  }: ButtonTextProps) => {
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          style,
          {
            marginLeft: marginLeft,
            backgroundColor: backgroundColor || theme.backgroundItem,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.54}>
        <Text
          blueLight={blueLight}
          type="H5"
          color={titleColor}
          white={white}
          hilight={hilight}
          {...textProps}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.White,
    ...Theme.center,
  },
});
