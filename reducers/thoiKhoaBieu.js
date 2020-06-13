import * as Types from "../constants/ActionType";

var initialState = [];

const thoiKhoaBieu = (state = initialState, action) => {
  var { thoiKhoaBieu } = action;
  switch (action.type) {
    case Types.FETCH_STUDENT_THOIKHOABIEU:
      return [...thoiKhoaBieu];
    default:
      return [...state];
  }
};
export default thoiKhoaBieu;
