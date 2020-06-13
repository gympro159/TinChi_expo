import * as Types from './../constants/ActionType';

var initialState = [];

const listTeachers = (state = initialState, action) => {
    var { listTeachers } = action;
    switch (action.type) {
        case Types.FETCH_LIST_TEACHERS:
            return [...listTeachers];
        default: return [...state];
    }
};
export default listTeachers;