import { ParamListBase, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface BaseNavigationProps<
  P extends ParamListBase,
  R extends keyof ParamListBase = string
  > {
  navigation: DrawerNavigationProp<P, R> & StackNavigationProp<P, R>;
  route: RouteProp<P, R>;
}

export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
  ? { screen: K; params?: ParamList[K] }
  : { screen: K; params: ParamList[K] };
}[keyof ParamList];
