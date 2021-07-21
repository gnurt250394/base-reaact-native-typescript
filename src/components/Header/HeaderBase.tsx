import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import images from 'res/images';

import colors from 'res/colors';
import sizes from 'res/sizes';
import ButtonBase from 'components/button/ButtonBase';
import {CommonScreen} from 'routers/screenName';
export interface HeaderBaseProps {
  title?: string;
  hideBackButton?: boolean;
  onBack?: () => void;
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
  iconLeft?: ImageSourcePropType;
  hideButtonRight?: boolean;
}
const HeaderBase = ({
  title,
  hideBackButton,
  onBack,
  buttonRight,
  buttonLeft,
  iconLeft,
  hideButtonRight,
}: HeaderBaseProps) => {
  const router = useNavigation();

  const onPressBack = () => (onBack ? onBack() : router.goBack());
  const onPressRight = () => router.navigate(CommonScreen.NotificationScreen);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          {hideBackButton ? null : buttonLeft ? (
            buttonLeft
          ) : (
            <ButtonBase
              onPress={onPressBack}
              hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
              iconLeft={iconLeft ? iconLeft : images.ic_back}
              style={[styles.buttonBack]}
            />
          )}
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        <View style={styles.button}>
          {hideButtonRight ? null : buttonRight ? (
            buttonRight
          ) : (
            <ButtonBase
              onPress={onPressRight}
              iconLeft={images.ic_notification}
              style={styles.buttonHeader}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderBase;

const styles = StyleSheet.create({
  buttonHeader: {},
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {flex: 1},
  txtTitle: {
    fontSize: sizes._14sdp,
    color: colors.white,
    fontWeight: 'bold',
  },
  containerTitle: {
    flex: 5,
    alignItems: 'flex-start',
    paddingRight: 10,
  },
  iconBack: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  button: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  container: {
    backgroundColor: colors.default,
    paddingTop: sizes._statusbar_height,
  },
});
