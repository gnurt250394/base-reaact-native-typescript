import actionTypes from '../actionTypes';
const _onSelectField = (payload: any) => {
  return {
    type: actionTypes.SELECT_FIELD,
    payload,
  };
};
const _onSelectRegion = (payload: any) => {
  return {
    type: actionTypes.SELECT_REGION,
    payload,
  };
};
const _onSetActiveTooltip = () => {
  return {
    type: actionTypes.SET_ACTIVE_TOOLTIP,
  };
};
export const onSelectField = (field) => {
  return (dispatch, getState) => {
    let date = new Date();
    // date.setHours(date.getHours() - 2);
    let data = field.map((item) => {
      return {
        ...item,
        id: item._id,
        dateSelected: date.getTime(),
      };
    });
    // let listField = getState().job?.field;

    // if (Array.isArray(listField)) {
    //   let list = listField.filter(
    //     (item) => diff_minutes(new Date().getTime(), item.dateSelected) >= 60,
    //   );

    //   data = data.concat(list);
    //   dispatch(_onSelectField(data));
    // } else {
    dispatch(_onSelectField(data));
    // }
  };
};

export const onSelectRegion = (region) => {
  return (dispatch, getState) => {
    dispatch(_onSelectRegion(region));
  };
};
export const onActiveTooltipField = () => {
  return (dispatch, getState) => {
    dispatch(_onSetActiveTooltip());
  };
};
