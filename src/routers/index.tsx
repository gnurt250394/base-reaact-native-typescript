// In App.js in a new project

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderTitleProps,
} from '@react-navigation/stack';
import * as React from 'react';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import strings from 'res/strings';
import LoginScreen from 'screens/auth/LoginScreen';
import SplashScreen from 'screens/SplashScreen/SplashScreen';
import WellcomeScreen from 'screens/Wellcome/WellcomeScreen';
import {AuthScreens, BottomTabHomeScreens, StartScreen} from './screenName';
import {LoginParams} from './service/NavigationParams';
import {isReadyRef, navigationRef} from './service/RootNavigation';
import TabsStack from './TabStack';
import TabsStackPartner from './TabStackPartner';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export interface MainParamList extends Record<string, object | undefined> {
  //* ************************************ Common screens ************************************* *//
  [AuthScreens.Login]: LoginParams;
}

// Define multiple groups of screens in objects like this
const commonScreens = {
  [StartScreen.Splash]: SplashScreen,
  [StartScreen.Wellcome]: WellcomeScreen,
};

const userScreens = {
  // [BottomTabHomeScreens.Home]: TabsStack,
  [AuthScreens.Login]: LoginScreen,
};
// const partnerScreens = {
//   // [screenName.TABHOME]: TabsStack,
//   [screenName.TABHOME]: TabsStackPartner,
// };

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'blue',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

function RootApp() {
  React.useEffect(() => {
    initNoti();
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {},
    );

    // return unsubscribe;
    return () => {
      unsubscribe();
      isReadyRef.current = false;
    };
  }, []);

  const initNoti = async () => {
    try {
      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      let permission = await messaging().requestPermission();

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
    } catch (error) {}
  };
  // const userProfile = useSelector(state => state.userProfile);
  // const result = React.useMemo(() => userScreens[userProfile?.position]);

  useReduxDevToolsExtension(navigationRef);
  return (
    <NavigationContainer
      theme={MyTheme}
      onReady={() => {
        isReadyRef.current = true;
      }}
      // onStateChange={(state) => {
      //   const previousRouteName = routeNameRef.current;
      //   const currentRouteName = getActiveRouteName(state);

      //   if (previousRouteName !== currentRouteName) {
      //     analytics().setCurrentScreen(currentRouteName, currentRouteName);
      //   }
      // }}
      ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={StartScreen.Splash}
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.default,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}>
        {Object.entries({
          // Use the screens normally
          ...commonScreens,
          // Use some screens conditionally based on some condition
          ...userScreens,
        }).map(([name, component], index) => {
          return (
            <RootStack.Screen
              key={index}
              name={name}
              options={({route}) => ({
                // headerTitle: formatMessage(getHeaderTitle(route)),
                animationEnabled: true,
                headerShown: false,
                // headerShown: showHeader(route),
              })}
              component={component}
            />
          );
        })}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootApp;
