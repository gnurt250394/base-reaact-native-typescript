import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { RoleType } from 'common/Constants';
import AuthApi from 'network/apis/auth/AuthApi';
import snackbarUtils from 'utils/snackbar-utils';
import actionTypes from '../actionTypes';
const _login = (payload: any) => {
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
const _logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const onSaveDataUser = (data: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(_login(data));
  };
};

export const onLogout = () => async (dispatch: any, getState: any) => {
  try {
    if (auth().currentUser) auth().signOut();
    let token = await messaging().getToken();
    // let res = await AuthApi.LogoutApi(token);
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
