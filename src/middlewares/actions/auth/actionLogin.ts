import actionTypes from '../actionTypes';
import { goBack, navigate, reset } from 'routers/service/RootNavigation';
import screenName from 'routers/screenName';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import snackbarUtils from 'utils/snackbar-utils';
import { hideLoading, showLoading } from 'components/Loading/LoadingComponent';
import apis from 'network/apis';
import { LoginApi, LogoutApi, RegisterApi } from 'network/apis/auth/AuthApi';
export const _login = (payload: any) => {
  console.log('payload: ', payload);
  return {
    type: actionTypes.LOGIN,
    payload,
  };
};
const _onSelectPosition = (payload: any) => {
  console.log('payload: ', payload);
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
    // let { latitude, longitude, address } = getState().job?.region;
    let params = {
      phone,
      password,
      // latitude,
      // longitude,
      // address,
    };
    showLoading();
    LoginApi(params)
      .then(res => {
        hideLoading();
        if (res.status == 200 && res.data.code == 0) {
          snackbarUtils.show('Đăng nhập thành công', 'success');
          dispatch(_login(res.data.data));
          if (isBack) {
            goBack();
          } else {
            navigate(screenName.TABHOME);
          }
        } else {
          snackbarUtils.show(
            res?.data?.message?.message ||
            res.data.message ||
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
    let { latitude, longitude, address } = getState().job?.region;
    let params = {
      phone,
      password,
      latitude,
      longitude,
      address,
    };
    showLoading();
    let token = await messaging().getToken();
    RegisterApi(params)
      .then(res => {
        hideLoading();
        if (res?.data?.code == 0) {
          snackbarUtils.show('Đăng ký thành công', 'success');
          dispatch(_login(res?.data?.data));
          if (isBack) {
            goBack();
          } else {
            navigate(screenName.updateField, {
              screen: screenName.TABHOME,
              // params: {user: 'jane'},
            });
          }
        } else {
          snackbarUtils.show(
            res?.data?.message || 'Đăng ký thất bại',
            'danger',
          );
        }
      })
      .catch(err => {
        hideLoading();
      });
  };
};
export const forgotPassword = (phone, password, isBack) => {
  return async (dispatch, getState) => {
    let { latitude, longitude, address } = getState().job?.region;
    let params = {
      phone,
      password,
      latitude,
      longitude,
      address,
    };
    showLoading();
    LoginApi(params, { accesstoken: token })
      .then(res => {
        hideLoading();
        if (res?.data?.code == 0) {
          snackbarUtils.show('Lấy lại mật khẩu thành công', 'success');
          dispatch(_login(res?.data?.data));
          if (isBack) {
            goBack();
          } else {
            navigate(screenName.TABHOME);
          }
        } else {
          snackbarUtils.show(
            res?.data?.message || 'Lấy lại mật khẩu thất bại',
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
    let res = await LogoutApi(token);
    dispatch(_logout());
    navigate(screenName.LOGIN);
  } catch (error) {
    console.log('error: ', error);
    snackbarUtils.show('Có lỗi xảy ra vui lòng thử lại', 'danger');
  }
};
export const onSelectPosition = (position: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(_onSelectPosition(position));
  };
};
