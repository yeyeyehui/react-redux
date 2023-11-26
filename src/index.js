import React from "react";

import ReactDOM from "react-dom/client";

import Counter1 from "./components/Counter1";

import Counter2 from "./components/Counter2";

import { Provider } from "./react-redux";

import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Counter1 />
    <Counter2 />
  </Provider>
);

// // redux最原始用法
// import React, { Component } from "react";

// import ReactDOM from "react-dom/client";

// import { createStore, bindActionCreators } from "./redux";

// const ADD = "ADD";

// const MINUS = "MINUS";

// // 控制中心
// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     case ADD:
//       return { number: state.number + 1 };
//     case MINUS:
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// };

// // 初始数据
// let initState = { number: 0 };

// // 创建状态管理器
// const store = createStore(reducer, initState);

// function add() {
//   return { type: "ADD" };
// }

// function minus() {
//   return { type: "MINUS" };
// }

// const boundActions = bindActionCreators({ add, minus }, store.dispatch);

// class Counter extends Component {
//   unsubscribe;

//   constructor(props) {
//     super(props);
//     this.state = { number: 0 };
//   }

//   componentDidMount() {
//     // 状态管理变化后触发更新state进行页面重新渲染
//     // 缺点是不能局部更新
//     this.unsubscribe = store.subscribe(() =>
//       this.setState({ number: store.getState().number })
//     );
//   }

// //   销毁监听
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {
//     return (
//       <div>
//         <p>{this.state.number}</p>
//         <button onClick={boundActions.add}>+</button>
//         <button onClick={boundActions.minus}>-</button>
//         <button onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
//         <button
//           onClick={() => {
//             setTimeout(() => {
//               boundActions.add();
//             }, 1000);
//           }}
//         >
//           1秒后加1
//         </button>
//       </div>
//     );
//   }
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<Counter />);

