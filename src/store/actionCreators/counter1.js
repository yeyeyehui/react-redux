import * as actionTypes from "../action-types";

const add = (payload) => ({ type: actionTypes.ADD1, payload });

const minus = () => ({ type: actionTypes.MINUS1 });

// 如果是thund异步，必须在异步里面再执行dispatch，等到dispatch传递不是函数为止
const thunkAdd = () => {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(function (dispatch) {
        setTimeout(() => {
          dispatch({ type: actionTypes.ADD1 });
        }, 1000);
      });
    }, 1000);
  };
};

// 派发的action是一个Promise
const promiseAdd = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ type: actionTypes.ADD1 });
    }, 1000);
  });
};

// 参数payload里面是promise
const promise2Add = () => {
  return {
    type: actionTypes.ADD1,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = Math.random();
        if (result > 0.5) {
          resolve(result);
        } else {
          reject(result);
        }
      }, 1000);
    }),
  };
};

export default { add, minus, thunkAdd, promiseAdd, promise2Add };
