import React from "react";

import ReactReduxContext from "../ReactReduxContext";

import { bindActionCreators } from "../../redux";

/**
 * 绑定事件和dispatch
 * @param {*} actionCreators 事件
 * @returns 
 */
function useBoundDispatch(actionCreators) {
  const { store } = React.useContext(ReactReduxContext);

  return bindActionCreators(actionCreators, store.dispatch);
}

export default useBoundDispatch;
