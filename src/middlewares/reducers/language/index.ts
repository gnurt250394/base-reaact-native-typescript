import { ActionPersist } from 'middlewares/actions/ActionData';
import types from 'middlewares/actions/actionTypes';
export interface LanguagesReducer {
  language?: string
}
const initialState: LanguagesReducer = {
  language: undefined,
};

const languageReducer = (state = initialState, action: ActionPersist<LanguagesReducer>) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE: {
      return { language: action.payload };
    }
    case 'persist/REHYDRATE':
      if (action.payload?.language) {
        return {
          ...state,
          ...action.payload?.language,
        };
      }
    default:
      return state;
  }
};

export default languageReducer;
