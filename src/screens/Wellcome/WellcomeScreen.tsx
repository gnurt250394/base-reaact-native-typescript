import Container from 'components/Container';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from 'res/colors';
import sizes from 'res/sizes';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from 'components/text/TextBase';
import ButtonBase from 'components/button/ButtonBase';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {MainParamList} from 'routers';
import {AuthScreens, StartScreen} from 'routers/screenName';
import {TypeScreenParam} from 'routers/service/NavigationParams';
interface WellcomeScreenProps {}

const WellcomeScreen = ({
  navigation,
}: BaseNavigationProps<MainParamList, StartScreen.Wellcome>) => {
  const onLoginOrRegister = (type: TypeScreenParam) => () => {
    navigation.replace(AuthScreens.Login, {typeScreen: type});
  };
  return (
    <Container
      title=""
      hideHeader={true}
      //   translucent={false}
      dark={true}
      style={styles.container}>
      <LinearGradient
        colors={[colors.linear1, colors.linear2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.containerLinear}>
        <Text style={styles.txtJob}>Job</Text>
        <View style={styles.containerLogo}>
          <Text style={styles.txtLogo}>JAY</Text>
          <Text style={styles.txtSlogan}>Việc làm quanh bạn</Text>
        </View>
      </LinearGradient>
      <View style={styles.containerContent}>
        <TextBase text="Chào mừng bạn đến với JAY" style={styles.txtWellcome} />
        <ButtonBase
          text="Đăng ký"
          onPress={onLoginOrRegister('register')}
          style={styles.buttonRegister}
        />
        <ButtonBase
          text="Đăng nhập"
          onPress={onLoginOrRegister('login')}
          style={styles.buttonLogin}
          textStyle={styles.txtLogin}
        />
      </View>
    </Container>
  );
};

export default WellcomeScreen;

const styles = StyleSheet.create({
  txtLogin: {color: colors.textColor},
  buttonLogin: {
    backgroundColor: colors.white,
  },
  buttonRegister: {
    backgroundColor: colors.buttonColor,
    marginVertical: sizes._23sdp,
  },
  txtWellcome: {
    color: colors.white,
    fontSize: sizes._12sdp,
  },
  containerContent: {
    paddingTop: sizes._241sdp,
    alignItems: 'center',
    flex: 1,
  },
  txtSlogan: {
    color: colors.white,
    fontSize: sizes._16sdp,
  },
  txtLogo: {
    fontSize: sizes._60sdp,
    fontWeight: 'bold',
    color: colors.white,
  },
  containerLogo: {
    paddingBottom: sizes._100sdp,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '-90deg'}],
  },
  txtJob: {
    transform: [{rotate: '180deg'}],
    fontSize: sizes._100sdp,
    color: '#ffffff10',
    fontWeight: 'bold',
    marginRight: sizes._60sdp,
  },
  containerLinear: {
    backgroundColor: colors.default,
    height: sizes._241sdp,
    width: sizes._567sdp,
    borderRadius: sizes._119sdp,
    transform: [{rotate: '90deg'}],
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: colors.default,
  },
});
