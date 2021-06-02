import * as React from 'react';
const Tab = createBottomTabNavigator();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StartScreen} from './screenName';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomBottomTab from './CustomBottomTab';
interface TitleProps {
  focused: boolean;
  color: string;
  size: number;
}
function TabsStack() {
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={({route}) => ({
        // title: ({focused, color, size}: TitleProps) => {
        //   switch (route.name) {
        //     case screenName.HOME:
        //       return formatMessage(msg.tab_home);

        //     case screenName.PROFILE:
        //       return formatMessage(msg.tab_profile);
        //     case screenName.NOTIFICATION:
        //       return formatMessage(msg.tab_notification);

        //     default:
        //       return '';
        //   }
        // },
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case screenName.HOME:
              return 'home';
            case screenName.PROFILE:
              return 'person';
            case screenName.NOTIFICATION:
              return 'notifications';
            default:
              return '';
          }

          // You can return any component that you like here!
        },
      })}
      tabBar={props => <CustomBottomTab {...props} />}
      tabBarOptions={{
        allowFontScaling: false,
        keyboardHidesTabBar: true,
      }}>
      {/* <Tab.Screen
        name={StartScreen.Home}
        component={HomeScreen}
        options={{unmountOnBlur: true}}
      /> */}
      <Tab.Screen
        name={screenName.NOTIFICATION}
        component={NotificationScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name={screenName.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default TabsStack;
