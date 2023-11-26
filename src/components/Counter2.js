import React from "react";

import actionCreators from "../store/actionCreators/counter2";

import { useSelector, useBoundDispatch } from "../react-redux";

function Counter2() {
  const { number } = useSelector((state) => state.counter2);
  const { add, minus } = useBoundDispatch(actionCreators);
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => add(0)}>+</button>
      <button onClick={minus}>-</button>
    </div>
  );
}

export default Counter2;
