import React from "react";

import { shallowEqual } from "react-redux";

import ReactReduxContext from "../ReactReduxContext";

function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = React.useContext(ReactReduxContext);

  const lastSelectedState = React.useRef(null);

  // 获取仓库中的最新的状态
  const state = store.getState();

  let selectedState = selector(state);

  // 每次计算完selectedState之后会判断状态变化了没有，如果变化 了，组件会刷新，如果没变化组件不刷新
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useLayoutEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      //比较老状态和新选中状态是否相等，如果相等，不刷新
      let selectedState = selector(state);
      if (!equalityFn(lastSelectedState.current, selectedState)) {
        lastSelectedState.current = selectedState;
        forceUpdate();
      }
    });
  }, []);

  //如何获取 最新的状态值  定义useEffect,然后给lastSelectedState.current赋值，可以在任何地方通过lastSelectedState.current取到新的值
  return selectedState;
}
export default useSelector;
