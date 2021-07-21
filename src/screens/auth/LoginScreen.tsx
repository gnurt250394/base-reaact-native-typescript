import ButtonBase from 'components/button/ButtonBase';
import Container from 'components/Container';
import InputBase from 'components/Input/InputBase';
import * as React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {MainParamList} from 'routers';
import {BaseNavigationProps} from 'routers/BaseNavigationProps';
import {CommonScreen, UserScreens} from 'routers/screenName';
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
import AuthApi from 'network/apis/auth/AuthApi';
import ResponseCode from 'network/ResponseCode';
import snackbarUtils from 'utils/snackbar-utils';
import ModalOtp from 'components/ModalOtp';
import {useMemo} from 'react';

const LoginScreen = ({
  navigation,
  route,
}: BaseNavigationProps<MainParamList, CommonScreen.LoginScreen>) => {
  const context = React.useContext(LocalizationContext);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isSendOtp, setIsSendOtp] = React.useState(false);

  let isBack: boolean = useMemo(
    () => route?.params?.isBack || false,
    [route?.params?.isBack],
  );
  const dispatch = useDispatch();

  const onCheckPhone = async (phone: string) => {
    try {
      let res = await AuthApi.CheckPhoneApi(phone);

      if (res?.status == ResponseCode.SUCCESS) {
        if (res.data == true) {
          snackbarUtils.show(
            'Xin lỗi, số điện thoại đã tồn tại trong hệ thống',
            'danger',
          );
        } else if (res?.data == false) {
          setIsVisible(true);
          setIsSendOtp(true);
        }
      }
    } catch (error) {}
  };
  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: LOGIN_FORM_SCHEMA,
    onSubmit: values => {
      const {phone, password} = values;

      switch (route.params.typeScreen) {
        case 'login':
          dispatch(login(phone, password, isBack));
          break;

        case 'register':
          onCheckPhone(values.phone);
          break;

        default:
          break;
      }
    },
  });
  const onBackdropPress = () => {
    setIsVisible(false);
    setIsSendOtp(false);
  };
  const onVerifySuccess = () => {
    dispatch(register(values.phone, values.password, isBack));
    onBackdropPress();
  };
  const onFogotPass = () => {
    navigation.navigate(CommonScreen.ForgotPasswordScreen, {
      phone: values.phone,
      isBack,
    });
  };
  const onLoginOrRegister = (type: TypeScreenParam) => () => {
    navigation.replace(CommonScreen.LoginScreen, {typeScreen: type});
  };
  const goHome = () => navigation.navigate(CommonScreen.Home);
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
            errors={errors}
            touched={touched}
            name={'phone'}
            onChangeText={handleChange('phone')}
            label={strings.username}
          />
          <InputBase
            placeholder={strings.password}
            name={'password'}
            errors={errors}
            touched={touched}
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
            style={styles.buttonLogin}
            onPress={handleSubmit}
          />
          <ButtonBase
            text={strings.forgotPassword}
            style={styles.buttonForgotPass}
            textStyle={styles.txtForgotPass}
            onPress={onFogotPass}
          />
        </View>
        <View style={styles.containerBottom}>
          <ButtonBase
            text="Về trang chủ"
            onPress={goHome}
            style={{paddingBottom: sizes._30sdp}}
            textStyle={{
              textDecorationLine: 'underline',
            }}
          />
          {route.params.typeScreen == 'register' ? (
            <TextBase style={{color: colors.white}}>
              Bạn đã có tài khoản?{' '}
              <TextBase
                onPress={onLoginOrRegister('login')}
                style={styles.txtLogin}
                text="Đăng nhập"
              />
            </TextBase>
          ) : (
            <TextBase style={{color: colors.white}}>
              Bạn chưa có tài khoản?{' '}
              <TextBase
                onPress={onLoginOrRegister('register')}
                style={styles.txtLogin}
                text="Đăng ký"
              />
            </TextBase>
          )}
        </View>
      </ScrollView>
      <ModalOtp
        isSendOtp={isSendOtp}
        isVisible={isVisible}
        onVerifySuccess={onVerifySuccess}
        onBackdropPress={onBackdropPress}
        phone={values.phone}
      />
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  txtLogin: {textDecorationLine: 'underline', fontWeight: '600'},
  buttonLogin: {
    marginTop: sizes._23sdp,
    backgroundColor: colors.buttonColor,
    width: sizes._256sdp,
    height: sizes._56sdp,
  },
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
    height: sizes._42sdp,
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
