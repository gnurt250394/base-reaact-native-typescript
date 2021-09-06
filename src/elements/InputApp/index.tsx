import {useTheme} from 'configs/ChangeTheme';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import React, {Dispatch, memo, SetStateAction} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';

interface InputAppProps {
  value: string;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  placeholder?: string;
  isShowIcon?: boolean;
  icon?: any;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  styleView?: ViewStyle;
  title: string;
  colorTitle?: string;
  borderColor?: string;
  iconPress?: () => void;
  autoFocus?: boolean;
  isShowIconLeft?: boolean;
  iconLeft?: any;
  iconPressLeft?: () => void;
  marginTop?: number;
  multiline?: boolean;
  editable?: boolean;
  onPress?: () => void;
  styleInput?: ViewStyle;
  errors?: FormikErrors<FormikValues>;
  touched?: FormikTouched<FormikValues>;
  name?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  isRequired?: boolean;
}

const InputApp = memo(
  ({
    value,
    placeholder,
    onChangeText,
    isShowIcon,
    icon,
    secureTextEntry,
    style,
    styleView,
    title,
    colorTitle,
    borderColor,
    iconPress,
    autoFocus,
    isShowIconLeft,
    iconLeft,
    iconPressLeft,
    marginTop,
    multiline,
    editable = true,
    onPress,
    styleInput,
    errors,
    touched,
    name,
    keyboardType,
    maxLength,
    isRequired,
  }: InputAppProps) => {
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        style={[
          styleView,
          {marginTop: marginTop, borderColor: theme.borderColor},
        ]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.7}>
        <Text type="H6" semiBold color={colorTitle}>
          {title} {isRequired && <Text color={colors.Red}>(*)</Text>}
        </Text>
        <TextInput
          {...{
            value,
            placeholder,
            onChangeText,
            isShowIcon,
            icon,
            secureTextEntry,
            borderColor,
            iconPress,
            autoFocus,
            isShowIconLeft,
            iconLeft,
            iconPressLeft,
            multiline,
            editable,
            errors,
            touched,
            name,
            keyboardType,
            maxLength,
          }}
          style={{marginTop: 4, ...style}}
        />
      </TouchableOpacity>
    );
  },
);

export default InputApp;

const styles = StyleSheet.create({
  container: {},
});
