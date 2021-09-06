import {useNavigation} from '@react-navigation/native';
import {Routes} from 'configs';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Text from 'elements/Text';
import React from 'react';
import {
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import sizes from 'res/sizes';
import scale from 'utils/scale';

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
  const onPressRight = () => router.navigate(Routes.NotificationScreen);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupHeader}>
        <View style={styles.button}>
          {hideBackButton ? null : buttonLeft ? (
            buttonLeft
          ) : (
            <ButtonIconHeader
              onPress={onPressBack}
              icon={iconLeft ? iconLeft : images.ic_back}
              isLeft
            />
          )}
        </View>
        <View style={styles.containerTitle}>
          <Text semiBold type="H5">
            {title}
          </Text>
        </View>
        {!!buttonRight && buttonRight}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  container: {
    backgroundColor: colors.White,
    paddingTop: sizes._statusbar_height,
  },
});
