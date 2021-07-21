import {ScrollContext} from 'components/Scroll/ScrollWrapper';
import TextBase from 'components/text/TextBase';
import React, {useContext, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';

export type MessageType = {
  [key: string]: string;
};
export type TouchedType = {
  [key: string]: boolean;
};
interface Props extends TextInputProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  errors?: MessageType;
  touched?: TouchedType;
  label?: string | React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  iconRight?: ImageSourcePropType;
  onPressRight?: () => void;
  styleError?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  name?: string;
  isRequired?: boolean;
}

const InputBase = ({
  children,
  value,
  style,
  errors,
  label,
  labelStyle,
  secureTextEntry,
  iconRight,
  onPressRight,
  styleError,
  touched,
  name,
  isRequired,
  ...props
}: Props) => {
  const {scrollTracker} = useContext(ScrollContext);
  const [isShowPass, setIsShowPass] = useState(false);
  const [secureText, setSecureText] = useState<boolean>(
    () => secureTextEntry || false,
  );
  const onPress = () => {
    secureTextEntry && setIsShowPass(isShowPass => !isShowPass);
    onPressRight && onPressRight();
  };
  const renderLabel = (
    label: string | React.ReactNode,
    isRequired?: boolean,
  ) => (
    <TextBase style={styles.txLabel}>
      {label}{' '}
      {isRequired ? <TextBase style={styles.txRequire}>*</TextBase> : ''}
    </TextBase>
  );
  return (
    <View
      onLayout={event => {
        if (scrollTracker && name) scrollTracker(event.target, name);
      }}
      style={[{paddingBottom: sizes._17sdp}]}>
      {label ? renderLabel(label, isRequired) : null}
      <View
        style={[
          styles.txt,
          style,
          errors && !!errors[name || ''] && touched && !!touched[name || '']
            ? [styles.borderError, styleError]
            : {},
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
      {errors && !!errors[name || ''] && touched && !!touched[name || ''] ? (
        <TextBase text={errors[name || '']} style={[styles.txtError]} />
      ) : null}
    </View>
  );
};
export default InputBase;

const styles = StyleSheet.create({
  txRequire: {
    color: colors.red,
  },
  txLabel: {
    color: colors.teal,
    fontSize: 14,
    textAlign: 'left',
  },
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
