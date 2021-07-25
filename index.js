/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
global.Realm = Realm;

AppRegistry.registerComponent(appName, () => App);
