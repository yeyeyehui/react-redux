// 函数链式调用
function compose(...funcs) {
  // a: 上一个函数执行返回的值
  // b: funcs当前需要执行的函数
  return funcs.reduce((a, b) => {
    return (args) => a(b(args));
  });
}

export default compose;
