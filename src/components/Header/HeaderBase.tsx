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
} from 'react-native';
import images from 'res/images';

import colors from 'res/colors';
import sizes from 'res/sizes';
interface Props {
  title?: string;
  hideBackButton?: boolean;
  onBack?: () => void;
  buttonRight?: React.ReactNode;
  buttonLeft?: React.ReactNode;
}
const HeaderBase = ({
  title,
  hideBackButton,
  onBack,
  buttonRight,
  buttonLeft,
}: Props) => {
  const router = useNavigation();

  const onPressBack = () => (onBack ? onBack : router.goBack());
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          {hideBackButton ? null : router.canGoBack() ? (
            buttonLeft ? (
              buttonLeft
            ) : (
              <TouchableOpacity
                onPress={onPressBack}
                hitSlop={{top: 15, left: 15, right: 15, bottom: 15}}
                style={[styles.flex, styles.buttonBack]}>
                <Image source={images.ic_back} style={styles.iconBack} />
              </TouchableOpacity>
            )
          ) : null}
        </View>
        <View style={styles.containerTitle}>
          <Text style={styles.txtTitle}>{title}</Text>
        </View>
        <View style={styles.button}>{buttonRight ? buttonRight : null}</View>
      </View>
    </SafeAreaView>
  );
};

export default HeaderBase;

const styles = StyleSheet.create({
  buttonBack: {alignItems: 'center', justifyContent: 'center'},
  flex: {flex: 1},
  txtTitle: {
    textAlign: 'center',
    fontSize: sizes._20sdp,
    color: colors.white,
    fontWeight: 'bold',
  },
  containerTitle: {
    flex: 3,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconBack: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeader: {
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    backgroundColor: colors.default,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
});
