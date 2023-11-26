import { createStore, applyMiddleware } from "../redux";

import combinedReducer from "./reducers";

import logger from "./middlewares/logger";

import thunk from "./middlewares/redux-thunk";

import promise from "./middlewares/redux-promise";

// 创建store并且加入了中间件
const store = applyMiddleware(thunk, promise, logger)(createStore)(
  combinedReducer
);

export default store;

//先缓存老的dispatch方法
//const next = store.dispatch;
//重写仓库的dispatch方法实现异步功能
/* store.dispatch = function(action){
    setTimeout(()=>{
        originDispatch(action);
    },1000);
    return action;
} */
//还可以实现日志功能
/* store.dispatch = function(action){
   console.log('prev state',store.getState());
   next(action);
   console.log('next state',store.getState());
} */
