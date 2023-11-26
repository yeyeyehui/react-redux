// 判断是否是对象
function isPlainObject(obj) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * 创建状态管理上下文
 * @param {*} reducer 集中管理器
 * @param {*} preloadState 初始化state 
 * @param {*} enhancer 
 * @returns 
 */
function createStore(reducer, preloadState, enhancer) {
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadState);
  }

  // 仓库的内部会保存一个状态,默认值是undefined
  let state = preloadState;

  // 监听函数的数组
  let listeners = [];

  // 获取当前的状态
  function getState() {
    return state;
  }

  // 执行函数
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        `动作对象必须是一个简单对象，但是真实类型是 ${typeof action},你可以有需要添加中间件给你的仓库去处理其它的类型,比如redux-thunk`
      );
    }

    // 获取到action后，会根据老状态和动作计算新状态,只能全量更新
    state = reducer(state, action);

    //通过所有的监听函数执行
    listeners.forEach((listener) => listener());
  }

  // 订阅函数
  function subscribe(listener) {
    listeners.push(listener);

    // useEffect副作用卸载监听
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
      //listeners=listeners.filter(l=>l!==listener);
    };
  }

  // 先执行一遍，进行state初始化
  dispatch({ type: "@@REDUX/INIT" });

  return {
    getState, // 获取仓库中的最新的状态
    dispatch, // 派发动作
    subscribe, // 订阅
  };
}

export default createStore;
