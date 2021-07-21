import actionTypes from '../actionTypes';
import { goBack, navigate, reset } from 'routers/service/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import snackbarUtils from 'utils/snackbar-utils';
import { hideLoading, showLoading } from 'components/Loading/LoadingComponent';
import apis from 'network/apis';
import { CommonScreen, UserScreens } from 'routers/screenName';
import AuthApi from 'network/apis/auth/AuthApi';
import { BaseResponse } from 'network/BaseResponse';
import { LoginResponse } from 'network/apis/auth/AuthResponse';
import ResponseCode from 'network/ResponseCode';
import { RoleType } from 'common/Constants';
export const _login = (payload: any) => {

  return {
    type: actionTypes.LOGIN,
    payload,
  };
};
const _onSelectPosition = (payload: RoleType) => {

  return {
    type: actionTypes.SELECT_POSITION,
    payload,
  };
};
export const _logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const login = (phone: string, password: string, isBack: boolean) => {
  return async (dispatch: any, getState: any) => {
    let accessToken = await messaging().getToken();
    let { latitude, longitude, address } = getState().job?.region || '';
    let params = {
      phone,
      password,
      latitude,
      longitude,
      address,
      accessToken
    };
    showLoading();
    AuthApi.LoginApi<LoginResponse>(params)
      .then(res => {

        hideLoading();
        if (res.status == ResponseCode.SUCCESS) {
          snackbarUtils.show('Đăng nhập thành công', 'success');
          dispatch(_login(res.data));
          if (isBack) {
            goBack();
          } else {
            navigate(UserScreens.HomeScreen);
          }
        } else {
          snackbarUtils.show(
            res.message ||
            'Đăng nhập thất bại',
            'danger',
          );
        }
      })
      .catch(err => {
        hideLoading();
      });
  };
};
export const register = (phone: string, password: string, isBack: boolean) => {
  return async (dispatch: any, getState: any) => {
    let accessToken = await messaging().getToken();
    let { latitude, longitude, address } = getState().job?.region;
    let params = {
      phone,
      password,
      latitude,
      longitude,
      address,
      accessToken
    };
    showLoading();
    AuthApi.RegisterApi<LoginResponse>(params)
      .then(res => {
        hideLoading();
        if (res?.status == ResponseCode.SUCCESS) {
          snackbarUtils.show('Đăng ký thành công', 'success');
          dispatch(_login(res?.data));
          if (isBack) {
            goBack();
          } else {
            navigate(CommonScreen.UpdateFieldScreen, {
              screen: UserScreens.HomeScreen,
              // params: {user: 'jane'},
            });
          }
        } else {
          snackbarUtils.show(
            res?.message || 'Đăng ký thất bại',
            'danger',
          );
        }
      })
      .catch(err => {
        hideLoading();
      });
  };
};
export const forgotPassword = (phone: string, password: string, isBack: boolean) => {
  return async (dispatch: any, getState: any) => {
    let { latitude, longitude, address } = getState().job?.region;
    let accessToken = await messaging().getToken();
    let params = {
      phone,
      password,
      latitude,
      longitude,
      address,
      accessToken
    };
    showLoading();
    AuthApi.ForgotPasswordApi<LoginResponse>(params)
      .then(res => {
        hideLoading();
        if (res?.data?.code == 0) {
          snackbarUtils.show('Lấy lại mật khẩu thành công', 'success');
          dispatch(_login(res?.data?.data));
          if (isBack) {
            goBack();
          } else {
            navigate(UserScreens.HomeScreen);
          }
        } else {
          snackbarUtils.show(
            res?.message || 'Lấy lại mật khẩu thất bại',
            'danger',
          );
        }
      })
      .catch(err => {
        hideLoading();
      });
  };
};

export const logout = () => async (dispatch: any, getState: any) => {
  try {
    if (auth().currentUser) auth().signOut();
    let token = await messaging().getToken();
    let res = await AuthApi.LogoutApi(token);
    dispatch(_logout());
    // navigate(CommonScreen.LoginScreen, { typeScreen: 'login' });
  } catch (error) {

    snackbarUtils.show('Có lỗi xảy ra vui lòng thử lại', 'danger');
  }
};
export const onSelectPosition = (position: RoleType) => {
  return (dispatch: any, getState: any) => {
    dispatch(_onSelectPosition(position));
  };
};
