import * as React from 'react';
const Tab = createBottomTabNavigator();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomBottomTab from './CustomBottomTab';

function TabsStack() {
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={({route}) => ({
        title: ({focused, color, size}) => {
          switch (route.name) {
            case screenName.HOME:
              return formatMessage(msg.tab_home);
            case screenName.listCv:
              return formatMessage(msg.tab_cv);
            case screenName.PROFILEPARTNER:
              return formatMessage(msg.tab_profile);
            case screenName.NOTIFICATION:
              return formatMessage(msg.tab_notification);

            default:
              return '';
          }
        },
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case screenName.HOME:
              return 'home';
            case screenName.listCv:
              return 'reader';
            case screenName.PROFILEPARTNER:
              return 'person';
            case screenName.NOTIFICATION:
              return 'notifications';
            default:
              return '';
          }
        },
      })}
      tabBar={(props) => <CustomBottomTab {...props} />}
      tabBarOptions={{
        allowFontScaling: false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name={screenName.HOME} component={HomeScreen} />
      {/* <Tab.Screen
        name={screenName.listCv}
        component={ListCv}
        options={{unmountOnBlur: true}}
      /> */}
      <Tab.Screen
        name={screenName.NOTIFICATION}
        component={NotificationScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name={screenName.PROFILEPARTNER}
        component={ProfilePartnerScreen}
      />
    </Tab.Navigator>
  );
}
export default TabsStack;
