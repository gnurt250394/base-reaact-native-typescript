import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInput,
  TextInputProps,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LanguagesReducer} from 'middlewares/reducers/language';
import sizes from 'res/sizes';
import colors from 'res/colors';
import TextBase from 'components/text/TextBase';
import images from 'res/images';
interface Props extends TextInputProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  isError?: boolean;
  messagesError?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  iconRight?: ImageSourcePropType;
  onPressRight?: () => void;
  styleError?: StyleProp<ViewStyle>;
}

const InputBase = ({
  children,
  value,
  style,
  isError,
  messagesError,
  label,
  labelStyle,
  secureTextEntry,
  iconRight,
  onPressRight,
  styleError,
  ...props
}: Props) => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [secureText, setSecureText] = useState(() => secureTextEntry);
  const onPress = () => {
    secureTextEntry && setIsShowPass(isShowPass => !isShowPass);
    onPressRight && onPressRight();
  };
  return (
    <View style={[{paddingBottom: sizes._17sdp}]}>
      {label ? (
        <TextBase text={label} style={[styles.txtLabel, labelStyle]} />
      ) : null}
      <View
        style={[
          styles.txt,
          isError ? [styles.borderError, styleError] : {},
          style,
        ]}>
        <TextInput
          secureTextEntry={secureTextEntry && !isShowPass ? secureText : false}
          style={styles.input}
          allowFontScaling={false}
          {...props}>
          {value}
        </TextInput>
        {!secureTextEntry && !iconRight ? null : (
          <TouchableOpacity
            onPress={onPress}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Image
              source={
                iconRight
                  ? iconRight
                  : isShowPass
                  ? images.ic_show_pass
                  : images.ic_hide_pass
              }
              style={{height: sizes._19sdp, width: sizes._19sdp}}
            />
          </TouchableOpacity>
        )}
      </View>
      {messagesError && isError ? (
        <TextBase text={messagesError} style={[styles.txtError]} />
      ) : null}
    </View>
  );
};
export default InputBase;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: sizes._10sdp,
    color: colors.textColor,
  },
  txtError: {
    color: colors.red,
    fontStyle: 'italic',
    fontSize: sizes._12sdp,
  },
  borderError: {
    borderColor: colors.red,
    borderWidth: sizes._1sdp,
  },
  txtLabel: {
    fontSize: sizes._15sdp,
    fontWeight: '500',
    marginBottom: sizes._3sdp,
  },
  txt: {
    fontSize: sizes._14sdp,
    // borderColor: colors.sencondary,
    // borderWidth: sizes._1sdp,
    paddingHorizontal: sizes._10sdp,
    marginBottom: sizes._3sdp,
    borderRadius: sizes._5sdp,
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes._52sdp,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
});
