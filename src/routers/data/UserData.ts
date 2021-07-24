import DrawerStack from 'routers/DrawerStack';
import {CommonScreen, UserScreens} from 'routers/screenName';
import TabsStack from 'routers/TabStack';
import HistoryScreen from 'screens/history/HistoryScreen';
import HomeScreen from 'screens/home/HomeScreen';
import PaymentScreen from 'screens/payment/PaymentScreen';
import ListServiceScreen from 'screens/services/ListServiceScreen';

const UserData = {
  [UserScreens.DrawerUserStack]: DrawerStack,
  [UserScreens.HomeScreen]: HomeScreen,
  [UserScreens.PaymentScreen]: PaymentScreen,
  [CommonScreen.HistoryScreen]: HistoryScreen,
  [UserScreens.ListServiceScreen]: ListServiceScreen,
};
export default UserData;
