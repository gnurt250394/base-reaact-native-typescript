import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {CommonScreen, UserScreens} from './screenName';
import sizes from 'res/sizes';
import CustomDrawer from 'components/drawer/CustomDrawer';
import colors from 'res/colors';
import images from 'res/images';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import HomeScreen from 'screens/home/HomeScreen';
const Drawer = createDrawerNavigator();

interface IconProps {
  focused: boolean;
  color: string;
  size: number;
  source: ImageSourcePropType;
}
function DrawerStack() {
  const renderIcon = ({source, color, size, focused}: IconProps) => {
    return (
      <Image
        source={source}
        style={[
          styles.iconDrawer,
          {
            tintColor: color,
          },
        ]}
      />
    );
  };
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: colors.activeColor}}
      drawerType={sizes._screen_width >= 768 ? 'permanent' : 'front'}
      drawerContentOptions={{
        activeTintColor: colors.white,
        inactiveTintColor: colors.white,
        activeBackgroundColor: colors.buttonColor,
      }}
      edgeWidth={sizes._50sdp}
      initialRouteName={CommonScreen.Home}
      drawerContent={props => <CustomDrawer {...props} />}
      lazy={true}>
      <Drawer.Screen
        name={CommonScreen.Home}
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          drawerLabel: 'Trang chủ',
          drawerIcon: props =>
            renderIcon({
              ...props,
              source: images.ic_home,
            }),
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerStack;

const styles = StyleSheet.create({
  iconDrawer: {
    height: sizes._20sdp,
    width: sizes._20sdp,
    resizeMode: 'contain',
  },
});
