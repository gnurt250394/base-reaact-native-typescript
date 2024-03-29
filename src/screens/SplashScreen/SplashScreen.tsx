import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import {useSelector} from 'react-redux';
import styles from './styles';

import strings from 'res/strings';
import {AuthReducer, UserProfile} from 'middlewares/reducers/auth/loginReducer';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {Routes} from 'configs';
import {reset} from 'navigation/service/RootNavigation';

const SplashScreen = ({
  navigation,
}: BaseNavigationProps<MainParamList, Routes.SplashScreen>) => {
  const userProfile: AuthReducer = useSelector(
    (state: any) => state.UserProfile,
  );

  useEffect(() => {
    setTimeout(() => {
      console.log('userProfile?.position: ', userProfile?.position);
      reset(Routes.MainTab);
    }, 2000);
  }, []);
  return (
    <MaskedView
      style={styles.container}
      maskElement={
        <View style={styles.containerMaker}>
          <Text style={styles.txtAppName}>JAY</Text>
          <Text style={styles.txtAppName2}>Việc làm quanh bạn</Text>
        </View>
      }>
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <Image
        source={{
          uri: 'https://live.staticflickr.com/7491/15192147744_a552734f63_b.jpg',
        }}
        style={styles.imageMaker}
      />
    </MaskedView>
  );
};

export default SplashScreen;
