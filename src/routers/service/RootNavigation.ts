import * as React from 'react';
import { StackActions, NavigationContainerRef, CommonActions } from '@react-navigation/native';
export const navigationRef = React.createRef<NavigationContainerRef>();
export const isReadyRef = React.createRef<boolean>();
export function navigate(name: string, params?: object) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
export function push(...args) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(...args));
  }
}
export function reset(name: string, params?: object) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.resetRoot({
      index: 0,
      routes: [{ name, params }],
    });
  }
}
