import React, {useContext, useEffect, useState} from 'react';
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
  TouchableOpacityProps,
  TouchableOpacityBase,
  ViewBase,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LanguagesReducer} from 'middlewares/reducers/language';
import sizes from 'res/sizes';
import colors from 'res/colors';
import TextBase from 'components/text/TextBase';
import images from 'res/images';
import {MessageType, TouchedType} from 'components/Input/InputBase';
import {ScrollContext} from 'components/Scroll/ScrollWrapper';
interface Props extends TouchableOpacityProps {
  style?: StyleProp<TextStyle>;
  errors?: MessageType;
  touched?: TouchedType;
  label?: string | React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  iconRight?: ImageSourcePropType;
  onPressRight?: () => void;
  styleError?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  isRequired?: boolean;
  children?: React.ReactNode;
}

const ButtonInputBase = ({
  value,
  style,
  errors,
  label,
  labelStyle,
  secureTextEntry,
  iconRight,
  onPressRight,
  styleError,
  placeholder,
  disabled,
  touched,
  name,
  isRequired,
  children,
  ...props
}: Props) => {
  const {scrollTracker} = useContext(ScrollContext);
  const onPress = () => {
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
      style={[{paddingBottom: sizes._17sdp, flex: 1}]}>
      {label ? renderLabel(label, isRequired) : null}
      <View
        style={[
          styles.txt,
          style,
          errors && errors[name || ''] && touched && touched[name || '']
            ? [styles.borderError, styleError]
            : {},
        ]}>
        <TouchableOpacity
          disabled={disabled || false}
          style={styles.buttonInput}
          {...props}>
          {value ? (
            <TextBase text={value} style={styles.input} />
          ) : !children ? (
            <TextBase
              text={placeholder || ''}
              style={[styles.input, {color: colors.darkgray}]}
            />
          ) : (
            children
          )}
        </TouchableOpacity>
        {!iconRight ? null : (
          <TouchableOpacity
            onPress={onPress}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Image source={iconRight} style={styles.iconRight} />
          </TouchableOpacity>
        )}
      </View>
      {errors && errors[name || ''] && touched && touched[name || ''] ? (
        <TextBase text={errors[name || '']} style={[styles.txtError]} />
      ) : null}
    </View>
  );
};
export default ButtonInputBase;

const styles = StyleSheet.create({
  txRequire: {
    color: colors.red,
  },
  txLabel: {
    color: colors.teal,
    fontSize: 14,
    textAlign: 'left',
  },
  iconRight: {
    height: sizes._19sdp,
    width: sizes._19sdp,
  },
  input: {
    paddingVertical: sizes._10sdp,
    color: colors.textColor,
  },
  buttonInput: {
    flex: 1,
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
