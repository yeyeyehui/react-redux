import React from "react";
import ReactReduxContext from "../ReactReduxContext";

/**
 * 通过redux的useContext获取store的dispatch
 * @returns 
 */
function useDispatch() {
  const { store } = React.useContext(ReactReduxContext);

  return store.dispatch;
}

export default useDispatch;
