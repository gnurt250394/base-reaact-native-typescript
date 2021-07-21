import DrawerStack from 'routers/DrawerStack';
import {CommonScreen, UserScreens} from 'routers/screenName';
import TabsStack from 'routers/TabStack';
import HomeScreen from 'screens/home/HomeScreen';

const UserData = {
  [UserScreens.DrawerUserStack]: DrawerStack,
  [UserScreens.HomeScreen]: HomeScreen,
};
export default UserData;
