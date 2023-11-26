function promise({ getState, dispatch }) {
  // next === dispatch，因为这个compose(...chain)(store.dispatch)
  return function (next) {
    // action就是actionCreators里面的事件执行结果{type: 'ADD1', payload: 5}
    return function (action) {
      // 说明派发的action是一个Promise
      if (action.then && typeof action.then === "function") {
        // 获取异步结果，手动调用dispatch
        action.then((action) => dispatch(action));
      } else if (action.payload && typeof action.payload.then === "function") {
        // 如果参数payload里面是promise
        action.payload
          .then((result) => dispatch({ ...action, payload: result }))
          .catch((error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          });
      } else next(action);
    };
  };
}

export default promise;
