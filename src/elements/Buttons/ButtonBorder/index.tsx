import Image from 'elements/Image';
import Text from 'elements/Text';
import React, {memo} from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';

interface ButtonBorderProps {
  title?: string;
  style?: ViewStyle;
  onPress?: () => void;
  borderColor?: ColorValue | string;
  color?: string;
  iconColor?: string;
  iconLeft?: any;
  iconRight?: any;
  backgroundColor?: ColorValue | string;
  height?: number;
  marginBottom?: number;
  white?: boolean;
}

const ButtonBorder = memo((props: ButtonBorderProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.54}
      style={[
        {
          height: props.height ? props.height : 50,
          borderColor: props.borderColor ? props.borderColor : colors.Platinum,
          backgroundColor: props.backgroundColor,
          borderWidth: 1,
          borderRadius: 12,
          marginBottom: props.marginBottom,
          ...Theme.flexRowCenter,
        },
        props.style,
      ]}
      onPress={props.onPress}>
      {props.iconLeft == null ? (
        <View />
      ) : (
        <Image tintColor={props.iconColor} source={props.iconLeft} />
      )}
      <Text
        white={props.white}
        size={15}
        lineHeight={18}
        marginHorizontal={10}
        color={props.color}>
        {props.title}
      </Text>
      {props.iconRight == null ? <></> : <Image source={props.iconLeft} />}
    </TouchableOpacity>
  );
});

export default ButtonBorder;

const styles = StyleSheet.create({
  container: {},
});
