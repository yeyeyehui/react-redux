function thunk({ getState, dispatch }) {
  // next === dispatch，因为这个compose(...chain)(store.dispatch)
  return function (next) {
    // action就是actionCreators里面的事件执行结果{type: 'ADD1', payload: 5}
    return function (action) {
      // 如果action为函数，就执行获取传递dispatch和state，让事件执行继续执行dispatch
      if (typeof action === "function") return action(dispatch, getState);
      return next(action);
    };
  };
}

export default thunk;
