// In App.js in a new project

import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthReducer} from 'middlewares/reducers/auth/loginReducer';
import * as React from 'react';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import CommonData from './data/CommonData';
import UserData from './data/UserData';
import {CommonScreen} from './screenName';
import {
  CreateJobParams,
  DetailCvParams,
  DetailJobParams,
  DetailPartnerParams,
  DetailRequestInterviewParams,
  EditProfileParams,
  ForgotPasswordParams,
  GooglePlacesInputParams,
  LoginParams,
  MapDirectionParams,
  SelectLocationParams,
  UpdateFieldParams,
} from './service/NavigationParams';
import {isReadyRef, navigationRef} from './service/RootNavigation';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
export interface MainParamList extends Record<string, object | undefined> {
  // ************************** auth *********************************//
  [CommonScreen.LoginScreen]: LoginParams;
  [CommonScreen.ForgotPasswordScreen]: ForgotPasswordParams;

  //* ************************************ Common screens ************************************* *//
  [CommonScreen.UpdateFieldScreen]: UpdateFieldParams;
  [CommonScreen.GooglePlacesInputScreen]: GooglePlacesInputParams;
  [CommonScreen.DetaiJobScreen]: DetailJobParams;
  [CommonScreen.EditProfileScreen]: EditProfileParams;
  [CommonScreen.DetailPartnerScreen]: DetailPartnerParams;
  [CommonScreen.DetailRequestInterviewScreen]: DetailRequestInterviewParams; //
  [CommonScreen.MapDirectionScreen]: MapDirectionParams; //
  [CommonScreen.SelectLocationScreen]: SelectLocationParams; //
  [CommonScreen.DetailCvScreen]: DetailCvParams; //
  [CommonScreen.CreateJobScreen]: CreateJobParams; //
}

// Define multiple groups of screens in objects like this

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
  // React.useEffect(() => {
  //   initNoti();
  //   const unsubscribe = messaging().onMessage(
  //     async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {},
  //   );

  //   // return unsubscribe;
  //   return () => {
  //     unsubscribe();
  //     isReadyRef.current = false;
  //   };
  // }, []);

  // const initNoti = async () => {
  //   try {
  //     // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //     let permission = await messaging().requestPermission();

  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });

  //     // Check whether an initial notification is available
  //     messaging()
  //       .getInitialNotification()
  //       .then(remoteMessage => {
  //         if (remoteMessage) {
  //           console.log(
  //             'Notification caused app to open from quit state:',
  //             remoteMessage.notification,
  //           );
  //         }
  //       });
  //   } catch (error) {}
  // };
  const userProfile: AuthReducer = useSelector(
    (state: any) => state.userProfile,
  );
  // const result = React.useMemo(
  //   () => (userProfile.position == 'user' ? UserData : PartnerData),
  //   [userProfile.position],
  // );
  // console.log('result: ', result);

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
        initialRouteName={CommonScreen.Splash}
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
          ...CommonData,
          // Use some screens conditionally based on some condition
          ...UserData,
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
