import {DataHair} from 'screens/home/HomeScreen';

export type AddressTypeParams = 'province' | 'district' | 'village';
export type TypeScreenParam = 'login' | 'register';
export interface LoginParams {
  typeScreen: TypeScreenParam;
  isBack?: boolean;
}
export type PaymentParams = {
  data: DataHair[];
};
