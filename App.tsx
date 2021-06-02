/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import RootView from './src/RootView';
import RootApp from './src/routers';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from 'middlewares/stores';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';
import LoadingComponent from 'components/Loading/LoadingComponent';
import LoadingManager from 'components/Loading/LoadingManager';
import {LocalizationProvider} from 'assets/languages/Translations';
const App = () => {
  const loadingRef: any = React.useRef();
  React.useEffect(() => {
    loadingRef && LoadingManager.register(loadingRef);
    return () => {
      LoadingManager.unregister(loadingRef);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <RootView>
            <MenuProvider>
              <RootApp></RootApp>
              <FlashMessage style={{paddingTop: 20}} />
            </MenuProvider>
            <LoadingComponent ref={loadingRef} />
          </RootView>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
