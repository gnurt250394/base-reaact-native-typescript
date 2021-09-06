import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'configs/ChangeTheme';
import Image from 'elements/Image';
import React, {memo, useCallback} from 'react';
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

interface ButtonIconHeaderProps {
  onPress?: () => void;
  marginLeft?: number;
  marginRight?: number;
  icon?: ImageSourcePropType;
  tintColor?: ColorValue;
  backgroundColor?: string;
  borderColor?: string;
  style?: ViewStyle;
  isLeft?: boolean;
}

const ButtonIconHeader = memo(
  ({
    onPress,
    style,
    marginLeft,
    marginRight,
    icon = images.ic_back,
    tintColor,
    isLeft,
  }: ButtonIconHeaderProps) => {
    const {goBack, canGoBack} = useNavigation();
    const _onPress = useCallback(() => {
      if (onPress) {
        onPress();
      } else {
        goBack();
      }
    }, [onPress]);
    const {theme} = useTheme();
    if (!canGoBack() && isLeft) return null;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          style,
          {
            marginLeft: marginLeft ? marginLeft : 0,
            marginRight: marginRight ? marginRight : 0,
            backgroundColor: colors.lightGray,
          },
        ]}
        onPress={_onPress}>
        <Image source={icon} tintColor={tintColor} />
      </TouchableOpacity>
    );
  },
);

export default ButtonIconHeader;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    ...Theme.center,
  },
});
