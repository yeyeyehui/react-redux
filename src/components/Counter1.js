import React from "react";

import actionCreators from "../store/actionCreators/counter1";

import { connect } from "../react-redux";

class Counter1 extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={() => this.props.add(5)}>+</button>
        <button onClick={this.props.minus}>-</button>
        <button onClick={() => this.props?.dispatch?.({ type: "MINUS1" })}>
          -
        </button>
        <button onClick={this.props.thunkAdd}>thunkAdd</button>
        <button onClick={this.props.promiseAdd}>promiseAdd</button>
        <button onClick={this.props.promise2Add}>promise2Add</button>
      </div>
    );
  }
}

//可以把仓库的状态映射为当前组件的属性对象
const mapStateToProps = (state) => state.counter1;

//把dispatch函数映射为组件的属性对象
export default connect(mapStateToProps, actionCreators)(Counter1);
