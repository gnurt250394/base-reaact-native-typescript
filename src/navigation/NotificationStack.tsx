import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import AccountScreen from 'screens/Account/AccountScreen';
import NotificationScreen from 'screens/Notification/NotificationScreen';

const Stack = createStackNavigator();

const NotificationStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.NotificationStack}
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default NotificationStack;
