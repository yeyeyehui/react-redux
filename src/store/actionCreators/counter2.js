import * as actionTypes from "../action-types";

const add = (payload) => ({ type: actionTypes.ADD2, payload });

const minus = () => ({ type: actionTypes.MINUS2 });

export default { add, minus };
