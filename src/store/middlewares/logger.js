/**
 * 日志中间件
 * @param getState 用来获取仓库状态 store.getState
 * @param dispatch 用来派发动作 其实是我们改造后的store.dispatch
 */
function logger({ getState }) {
  // next === dispatch，因为这个compose(...chain)(store.dispatch)
  return function (next) {
    // action就是actionCreators里面的事件执行结果{type: 'ADD1', payload: 5}
    return function (action) {
      // 最终会返回新的dispatch
      console.log("prev state", getState().counter1.number);

      // 调用原始的dispatch方法，派发动作，这里可以修改传递给dispatch的数据
      // next(action) === dispatch({type: 'ADD1', payload: 5})
      next(action);

      console.log("next state", getState().counter1.number);
    };
  };
}

export default logger;
