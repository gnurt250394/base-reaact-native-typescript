import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from 'screens/home/HomeScreen';
import NotificationScreen from 'screens/notification/NotificationScreen';
import {CommonScreen} from './screenName';
import CustomBottomTab from './CustomBottomTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryScreen from 'screens/history/HistoryScreen';
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
    case CommonScreen.HistoryScreen:
      return 'Lịch sử';
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
      case CommonScreen.HistoryScreen:
        return 'newspaper';
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
        name={CommonScreen.HistoryScreen}
        component={HistoryScreen}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
}
export default TabsStack;
