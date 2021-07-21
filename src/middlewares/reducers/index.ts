import { combineReducers, createStore } from 'redux';
import loginReducer, { AuthReducer } from './auth/loginReducer';
import jobReducer from './job/jobReducer';
import languageReducer, { LanguagesReducer } from './language';
export interface RootReducer {
  userProfile: AuthReducer
  language: LanguagesReducer

}
const allReducer = combineReducers({
  userProfile: loginReducer,
  language: languageReducer,
  job: jobReducer,
});
export default allReducer;
