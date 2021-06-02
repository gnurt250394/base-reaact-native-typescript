import { ActionPersist } from './../../actions/ActionData';
import actionTypes from 'middlewares/actions/actionTypes';
export interface UserProfile {
  loginToken?: string;
  [key: string]: any
}
export interface AuthReducer {
  user: UserProfile;
  isLogin: boolean;
  count: number;
  position: string
  field: any
}
const initialState: AuthReducer = {
  user: {},
  isLogin: false,
  count: 0,
  position: '',
  field: null,
};

const loginReducer = (state = initialState, action: ActionPersist<AuthReducer>) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLogin: true,
      };
    case actionTypes.SELECT_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    case actionTypes.NOTIFICATION:
      return {
        ...state,
        count: action.data,
      };
    case 'persist/REHYDRATE':
      console.log('action?.payload: ', action?.payload?.userProfile);
      if (action?.payload?.userProfile) {
        if (action?.payload?.userProfile?.user.loginToken) {
          return {
            ...state,
            ...action.payload.userProfile,
            isLogin: true,
          };
        }

        return {
          ...state,
          ...action.payload.userProfile,
        };
      }
    default:
      return state;
  }
};
export default loginReducer;
