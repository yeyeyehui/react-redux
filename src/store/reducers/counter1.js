import * as actionTypes from "../action-types";

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case actionTypes.ADD1:
      if (!action.error) {
        return { number: state.number + (action.payload || 1) };
      }
      return state;
    case actionTypes.MINUS1:
      return { number: state.number - 1 };
    default:
      return state;
  }
}

export default reducer;
