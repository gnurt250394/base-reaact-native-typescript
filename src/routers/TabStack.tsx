import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from 'screens/home/HomeScreen';
import NotificationScreen from 'screens/notification/NotificationScreen';
import {CommonScreen} from './screenName';
import CustomBottomTab from './CustomBottomTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

interface TitleProps {
  focused: boolean;
  color: string;
  size: number;
}
const renderLabel = routeName => {
  console.log('route: ', routeName);
  switch (routeName) {
    case CommonScreen.Home:
      return 'Trang chủ';
    case CommonScreen.NotificationScreen:
      return 'Thông báo';
    default:
      return '';
  }
};
const renderIcon =
  (routeName: string) =>
  ({focused, color, size}) => {
    switch (routeName) {
      case CommonScreen.Home:
        return 'home';
      case CommonScreen.NotificationScreen:
        return 'notifications';
      default:
        return '';
    }
  };
function TabsStack() {
  return (
    <Tab.Navigator
      lazy={true}
      screenOptions={({route}) => ({
        title: renderLabel(route.name),
        tabBarIcon: renderIcon(route.name),
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
      <Tab.Screen name={CommonScreen.Home} component={HomeScreen} />
      <Tab.Screen
        name={CommonScreen.NotificationScreen}
        component={NotificationScreen}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}
export default TabsStack;
