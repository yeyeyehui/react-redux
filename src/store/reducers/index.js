import { combineReducers } from "../../redux";

import counter1 from "./counter1";

import counter2 from "./counter2";

export default combineReducers({
  counter1,
  counter2,
});

/**
 * 合并之后的总的reducer也会对应一个合并后的状态对象，长的样子和
 * 也就是说合并后的state 
 *  {
      counter1:{number:0},
      counter2:{number:0}
    }
 */
