import { condition } from 'res/type/condition';
import { Routes } from "configs";
import { StyleProp, ViewStyle } from 'react-native';
import { TypeScreen } from 'res/type/verifyPhone';
import { TcodeAddress, TSelectAddress } from 'res/type/address';
export interface MainParamList extends Record<string, object | undefined> {
  [Routes.MainTab]: undefined,
  [Routes.Login]: undefined,
  [Routes.ForgetPassword]: undefined,
  [Routes.RecoveryPassword]: undefined,
  [Routes.ChangePasswordSuccessful]: undefined,
  [Routes.SignUp]: undefined,

  [Routes.VerifyPhoneNumber]: VerifyPhoneNumber,
  [Routes.SignUpSuccessful]: undefined,
};

type SignUp = {
  phoneNumber: string
}
type VerifyPhoneNumber = {
  phoneNumber: string,
  typeScreen: TypeScreen
}