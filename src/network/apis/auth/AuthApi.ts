import network from "network/apis";
import messaging from '@react-native-firebase/messaging';
import { LoginParams } from "./AuthRequest";

export const LoginApi = async (params: LoginParams) => {
  let token = await messaging().getToken();
  return network.post(network.path.auth.login, params, { headers: { accessToken: token } });
};
export const RegisterApi = async (params: LoginParams) => {
  let token = await messaging().getToken();
  return network.post(network.path.auth.register, params, { headers: { accessToken: token } });
};
export const LogoutApi = (accessToken: string) => {
  return network.get(network.path.auth.logout, { params: { accessToken } });
};
