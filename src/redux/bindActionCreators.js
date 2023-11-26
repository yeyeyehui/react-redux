/**
 * 绑定actionCreator和dispatch函数
 * @param {*} actionCreator 创建action的函数
 * @param {*} dispatch store.dispatch
 * @returns
 */
function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    dispatch(actionCreator(...args));
  };
}

/**
 * 封装调用事件和dispatch，dispatch(事件(args));
 * @param {*} actionCreators 事件集合
 * @param {*} dispatch store.dispatch
 * @returns
 */
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};

  // 循环需要绑定dispatch的事件
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];

    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }

  return boundActionCreators;
}

export default bindActionCreators;
