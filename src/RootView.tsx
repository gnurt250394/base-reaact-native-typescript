import {InternetConnection} from 'components/InternetConnection';
import PushController from 'components/notification/PushController';
import UpdateApp from 'components/UpdateApp';
import React, {Component, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  LogBox,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import colors from 'res/colors';
import stringUtils from 'utils/string-utils';
LogBox.ignoreLogs(['Remote debugger']);
interface Props {
  children?: ReactNode;
}
const RootView = ({children}: Props) => {
  return (
    <View style={[styles.container]}>
      <StatusBar backgroundColor={colors.transparent} translucent={true} />
      <UpdateApp />
      {children}
      {/* <PushController /> */}
      <InternetConnection />
    </View>
  );
};

export default RootView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
