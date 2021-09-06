import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import {RootReducer} from 'middlewares/reducers';
import {AuthReducer} from 'middlewares/reducers/auth/loginReducer';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';
import HomeScreen from 'screens/Home/HomeScreen';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.MainTab}>
      <Stack.Screen component={HomeScreen} name={Routes.HomeScreen} />
      <Stack.Screen component={MainTab} name={Routes.MainTab} />
    </Stack.Navigator>
  );
});

export default RootStack;
