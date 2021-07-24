import {InternetConnection} from 'components/InternetConnection';
import PushController from 'components/notification/PushController';
import {TasksProvider} from 'components/TaskProvider';
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
import 'utils/string-utils';
LogBox.ignoreLogs(['Remote debugger']);
interface Props {
  children?: ReactNode;
}
const RootView = ({children}: Props) => {
  return (
    <TasksProvider>
      <View style={[styles.container]}>
        <StatusBar backgroundColor={colors.transparent} translucent={true} />
        {!__DEV__ && <UpdateApp />}
        {children}
        {/* <PushController /> */}
        <InternetConnection />
      </View>
    </TasksProvider>
  );
};

export default RootView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
