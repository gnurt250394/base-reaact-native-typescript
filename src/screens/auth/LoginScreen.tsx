import ButtonBase from 'components/button/ButtonBase';
import Container from 'components/Container';
import InputBase from 'components/Input/InputBase';
import * as React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {MainParamList} from 'routers';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {AuthScreens} from 'routers/screenName';
import {useFormik} from 'formik';
import {LOGIN_FORM_SCHEMA} from './Constant';
import colors from 'res/colors';
import sizes from 'res/sizes';
import strings from 'res/strings';
import {LocalizationContext} from 'assets/languages/Translations';
import LinearGradient from 'react-native-linear-gradient';
import TextBase from 'components/text/TextBase';
import {TypeScreenParam} from 'routers/service/NavigationParams';
import {useDispatch} from 'react-redux';
import {login, register} from 'middlewares/actions/auth/actionLogin';

const LoginScreen = ({
  navigation,
  route,
}: BaseNavigationProps<MainParamList, AuthScreens.Login>) => {
  const context = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: LOGIN_FORM_SCHEMA,
    onSubmit: values => {
      const {phone, password} = values;
      console.log('values: ', values);
      switch (route.params.typeScreen) {
        case 'login':
          dispatch(login(phone, password, false));
          break;

        case 'register':
          dispatch(register(phone, password, false));
          break;

        default:
          break;
      }
    },
  });
  const onLoginOrRegister = (type: TypeScreenParam) => () => {
    navigation.replace(AuthScreens.Login, {typeScreen: type});
  };
  return (
    <Container hideHeader={true} style={styles.container}>
      <LinearGradient
        colors={[colors.linear1, colors.linear2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.containerLinear}>
        <View style={styles.containerLogo}>
          <Text style={styles.txtLogo}>JAY</Text>
          <Text style={styles.txtSlogan}>Việc làm quanh bạn</Text>
        </View>
      </LinearGradient>
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.containerInput}>
          <InputBase
            placeholder={strings.username}
            isError={!!errors.phone && touched.phone}
            messagesError={errors.phone}
            onChangeText={handleChange('phone')}
            label={strings.username}
          />
          <InputBase
            placeholder={strings.password}
            isError={!!errors.password && touched.password}
            messagesError={errors.password}
            onChangeText={handleChange('password')}
            secureTextEntry={true}
            label={strings.password}
          />
          <ButtonBase
            text={
              route.params.typeScreen == 'login'
                ? strings.login
                : strings.register
            }
            style={{marginTop: sizes._23sdp}}
            onPress={handleSubmit}
          />
          <ButtonBase
            text={strings.forgotPassword}
            style={styles.buttonForgotPass}
            textStyle={styles.txtForgotPass}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.containerBottom}>
          {route.params.typeScreen == 'register' ? (
            <TextBase style={{color: colors.white}}>
              Bạn đã có tài khoản?{' '}
              <TextBase
                onPress={onLoginOrRegister('login')}
                style={{textDecorationLine: 'underline', fontWeight: '600'}}
                text="Đăng nhập"
              />
            </TextBase>
          ) : (
            <TextBase style={{color: colors.white}}>
              Bạn chưa có tài khoản?{' '}
              <TextBase
                onPress={onLoginOrRegister('register')}
                style={{textDecorationLine: 'underline', fontWeight: '600'}}
                text="Đăng ký"
              />
            </TextBase>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containerBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: sizes._40sdp,
  },
  txtForgotPass: {
    textDecorationLine: 'underline',
    fontWeight: '300',
  },
  buttonForgotPass: {
    marginTop: sizes._10sdp,
    backgroundColor: colors.transparent,
    height: undefined,
  },
  containerInput: {
    padding: sizes._20sdp,
    borderRadius: sizes._10sdp,
    paddingTop: sizes._270sdp,
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
    position: 'absolute',
    top: -sizes._150sdp,
  },
  container: {
    backgroundColor: colors.default,
  },
});
