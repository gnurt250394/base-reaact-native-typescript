import React, {memo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'configs';
import CategoryScreen from 'screens/Category/CategoryScreen';

const Stack = createStackNavigator();

const CategoryStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.CategoryStack}
        component={CategoryScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
});

export default CategoryStack;
