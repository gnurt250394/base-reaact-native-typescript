import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from 'configs';
import Image from 'elements/Image';
import Layout from 'elements/Layout/Layout';
import React, {memo, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import HomeStack from './HomeStack';
import SettingStack from './SettingStack';
import CategoryStack from './CategoryStack';
import NotificationStack from './NotificationStack';
import Text from 'elements/Text';
import scale from 'utils/scale';

const Tab = createBottomTabNavigator();
const MainTab = memo(() => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        tabBar={(
          props: JSX.IntrinsicAttributes & {
            state: any;
            descriptors: any;
            navigation: any;
          },
        ) => <MyTabBar {...props} />}
        lazy={true}>
        <Tab.Screen name={Routes.HomeStack} component={HomeStack} />
        <Tab.Screen name={Routes.CategoryStack} component={CategoryStack} />
        <Tab.Screen
          name={Routes.NotificationStack}
          component={NotificationStack}
        />
        <Tab.Screen name={Routes.AccountStack} component={SettingStack} />
      </Tab.Navigator>
    </View>
  );
});

const MyTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return useMemo(() => {
    return (
      <Layout style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            return navigation.navigate(route.name);
          };

          const getNameIcon = () => {
            switch (index) {
              case 0:
                return isFocused
                  ? images.ic_home_active
                  : images.ic_home_normal;
              case 1:
                return isFocused
                  ? images.ic_category_active
                  : images.ic_category_normal;
              case 2:
                return isFocused
                  ? images.ic_notification_normal
                  : images.ic_notification_normal;
              case 3:
                return isFocused
                  ? images.ic_account_active
                  : images.ic_account_normal;
              default:
                return images.ic_home_normal;
            }
          };
          const getTabName = () => {
            switch (index) {
              case 0:
                return 'Trang chủ';
              case 1:
                return 'Danh mục';
              case 2:
                return 'Thông báo';
              case 3:
                return 'Cá nhân';
              default:
                return 'Trang chủ';
            }
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.btn}
              key={index}
              activeOpacity={1}>
              <View style={[styles.borderButton]}>
                <Image source={getNameIcon()} />
                <Text color={!!isFocused ? colors.primary : ''} type="Label">
                  {getTabName()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Layout>
    );
  }, [state, descriptors, navigation]);
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 6 + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    paddingTop: scale(14),
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
  },
  borderButton: {
    borderRadius: 12,
    ...Theme.center,
  },
  borderActive: {
    backgroundColor: colors.TealBlue20,
  },
});

export default MainTab;
