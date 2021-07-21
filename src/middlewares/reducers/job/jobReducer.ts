import { ActionPersist } from 'middlewares/actions/ActionData';
import actionTypes from 'middlewares/actions/actionTypes';
export interface RegionReducer {
  latitude: number;
  longitude: number;
  address?: string
}
export interface JobReducer {
  field: any[] | null;
  region: RegionReducer;
  tooltipField: boolean;
}

const initialState: JobReducer = {
  field: null,
  region: { latitude: 0, longitude: 0 },
  tooltipField: true,
};

const jobReducer = (state = initialState, action: ActionPersist<JobReducer>) => {
  switch (action.type) {
    case actionTypes.SELECT_FIELD:
      return {
        ...state,
        field: action.payload,
      };
    case actionTypes.SET_ACTIVE_TOOLTIP:
      return {
        ...state,
        tooltipField: false,
      };
    case actionTypes.SELECT_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case 'persist/REHYDRATE':
      if (action.payload?.job) {
        return {
          ...state,
          ...action.payload?.job,
        };
      }
    default:
      return state;
  }
};
export default jobReducer;
