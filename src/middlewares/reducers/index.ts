import { combineReducers, createStore } from 'redux';
import loginReducer, { AuthReducer } from './auth/loginReducer';
import languageReducer, { LanguagesReducer } from './language';
export interface RootReducer {
  userProfile: AuthReducer
  language: LanguagesReducer

}
const allReducer = combineReducers({
  userProfile: loginReducer,
  language: languageReducer,
});
export default allReducer;
