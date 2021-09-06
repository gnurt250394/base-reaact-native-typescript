import { ParamListBase, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainParamList } from './service/NavigationParams';

export interface BaseNavigationProps<
  P extends ParamListBase,
  R extends keyof ParamListBase = string
  > {
  navigation: StackNavigationProp<P, R>;
  route: RouteProp<P, R>;
}

export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
  ? { screen: K; params?: ParamList[K] }
  : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type BaseRouteProps<RouteName extends keyof MainParamList> = RouteProp<
  MainParamList,
  RouteName
>;