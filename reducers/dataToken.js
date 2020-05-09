import * as Types from "../constants/ActionType";

var initialState = {};

const dataToken = (state = initialState, action) => {
  var { dataToken } = action;
  switch (action.type) {
    case Types.GET_TOKEN:
      return {...dataToken};
    case Types.DELETE_TOKEN:
      return {};
    default:
      return {...state};
  }
};
export default dataToken;
