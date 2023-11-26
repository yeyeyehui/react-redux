import compose from "./compose";

/**
 * const store = applyMiddleware(thunk, promise, logger)(createStore)(combinedReducer)
 * 应用中间件：middlewares=[thunk,promise,logger]
 */
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      // 创建状态上下文
      const store = createStore(reducer);

      let newDispatch;

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => { // dispatch AOP
          newDispatch(action);
        },
      };

      // 执行中间件,获取闭包函数
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));

      // 函数链式调用获取中间件执行过的dispatch
      newDispatch = compose(...chain)(store.dispatch);

      // 重新赋值dispatch
      store.dispatch = newDispatch;
      
      return store;
    };
  };
}

export default applyMiddleware;

/**
function logger({getState}){
    return function(next){//调用原始的store.dispatch
       return function(action){//最终会返回新的dispatch
        console.log('prev state',getState());
        next(action);//调用原始的dispatch方法，派发动作
        console.log('next state',getState());
       }
    }
}
 */
