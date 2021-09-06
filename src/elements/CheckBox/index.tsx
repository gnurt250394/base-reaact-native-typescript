import Image from 'elements/Image';
import React, {memo} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface CheckBoxProps {
  icon?: ImageSourcePropType;
  isCheck?: boolean | number;
  style?: ViewStyle;
  onPress?: () => void;
  isRounded?: boolean;
}

const CheckBox = memo(
  ({isCheck, style, onPress, isRounded, icon}: CheckBoxProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={{...Theme.icons, ...Theme.center, ...style}}
        onPress={onPress}>
        {isCheck ? (
          <View>
            {isRounded ? (
              <Image source={images.ic_radio_active1} />
            ) : (
              <Image source={icon ? icon : images.ic_checkbox_active} />
            )}
          </View>
        ) : (
          <View>
            {isRounded ? (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderColor: '#979797',
                  borderRadius: 30,
                  borderWidth: 1,
                }}
              />
            ) : style ? (
              <View />
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderColor: '#979797',
                  borderRadius: 3,
                  borderWidth: 1,
                }}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

export default CheckBox;

const styles = StyleSheet.create({
  container: {},
});
