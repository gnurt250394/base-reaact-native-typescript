import {CommonScreen} from 'routers/screenName';
import LoginScreen from 'screens/auth/LoginScreen';
import NotificationScreen from 'screens/notification/NotificationScreen';
import SplashScreen from 'screens/SplashScreen/SplashScreen';
import WellcomeScreen from 'screens/Wellcome/WellcomeScreen';

const CommonData = {
  [CommonScreen.Splash]: SplashScreen,
  [CommonScreen.Wellcome]: WellcomeScreen,
  [CommonScreen.LoginScreen]: LoginScreen,
  [CommonScreen.NotificationScreen]: NotificationScreen,
};
export default CommonData;
