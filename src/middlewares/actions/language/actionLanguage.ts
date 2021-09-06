import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Language } from 'assets/languages/Translations';
import { RoleType } from 'common/Constants';
import AuthApi from 'network/apis/auth/AuthApi';
import snackbarUtils from 'utils/snackbar-utils';
import actionTypes from '../actionTypes';
const _setLanguage = (payload: Language) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    payload,
  };
};
export const onSetLanguage = (language: Language) => {
  return (dispatch: any, getState: any) => {
    dispatch(_setLanguage(language));
  };
};
