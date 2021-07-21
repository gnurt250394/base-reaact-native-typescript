import {AuthReducer} from 'middlewares/reducers/auth/loginReducer';
import apis from 'network/apis';
import NotificationApi from 'network/apis/notification/NotificationApi';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import sizes from 'res/sizes';
import {CommonScreen} from './screenName';
import {navigate} from './service/RootNavigation';

const CustomBottomTab = ({state, descriptors, navigation}) => {
  console.log('state: ', state);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const userProfile: AuthReducer = useSelector(
    (state: any) => state.userProfile,
  );
  const [badge, setBadge] = useState(0);
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const getBadgeNotification = async () => {
    try {
      let res = await NotificationApi.getReadNotification<number>();
      setBadge(res?.data || 0);
    } catch (error) {}
  };
  useEffect(() => {
    if (userProfile?.isLogin) getBadgeNotification();
  }, [state, userProfile?.isLogin]);
  return (
    <View style={styles.groupTab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const iconName =
          options.tabBarIcon !== undefined ? options.tabBarIcon : route.name;

        console.log('iconName: ', iconName);
        const isFocused = state.index === index;

        const renderBadge = () => {
          if (
            route.name === CommonScreen.NotificationScreen &&
            badge &&
            userProfile?.isLogin
          ) {
            return (
              <View style={styles.containerBadge}>
                <Text style={styles.txtBadge}>{badge}</Text>
              </View>
            );
          }
        };
        const onPress = () => {
          if (route.name === CommonScreen.NotificationScreen) {
            if (!userProfile?.isLogin) {
              navigate(CommonScreen.LoginScreen);
              return;
            }
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.containerTab}>
            <Ionicons
              name={iconName(isFocused)}
              size={20}
              color={isFocused ? colors.default : colors.gray}
            />
            {renderBadge()}
            <Text style={{color: isFocused ? colors.default : colors.gray}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  groupTab: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#00000030',
  },
  txtBadge: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: sizes._14sdp,
  },
  containerBadge: {
    backgroundColor: colors.default,
    position: 'absolute',
    top: -10,
    right: 30,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25 / 2,
    shadowOpacity: 0.3,
    shadowColor: colors.black,
    shadowOffset: {width: 1, height: 1},
    elevation: 2,
    // marginTop:5
  },
  containerTab: {
    flex: 1,
    paddingBottom: Platform.OS == 'ios' ? 20 : 10,
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
