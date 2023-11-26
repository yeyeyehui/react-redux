import React from "react";

import ReactReduxContext from "./ReactReduxContext";

import { bindActionCreators } from "../redux";

/**
 * 关联组件和仓库，类组件
 * @param {*} mapStateToProps 把仓库中的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps 把仓库中的dispatch方法映射为组件的属性对象
 */
function connect_bak(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext;
      constructor(props, context) {
        super(props);
        //获取context中的仓库
        const { store } = context;
        const { getState, subscribe, dispatch } = store;
        //从仓库状态中映射出新的状态变成属性对象传递给老组件
        this.state = mapStateToProps(getState());
        let dispatchProps = {};
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(
            mapDispatchToProps,
            store.dispatch
          );
        } else {
          dispatchProps = { dispatch };
        }
        this.dispatchProps = dispatchProps;
        this.unsubscribe = subscribe(() => {
          this.setState(mapStateToProps(getState()));
        });
      }
      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return (
          <OldComponent
            {...this.props}
            {...this.state}
            {...this.dispatchProps}
          />
        );
      }
    };
  };
}

/**
 * PureComponent当属性和状态没有变化的时候不重新渲染
 * 刚才做的优化是有些值只计算一次，不需要反复计算
 * 因为函数组件没有构造函数，没有地方说只能执行一次，只能用useMemo
 * @param {*} mapStateToProps 把仓库中状态映射为当前的组件的属性，仓库中的状态映射为组件的属性对象
 * @param {*} mapDispatchToProps 把派发动作的方法映射为组件的属性，库中的dispatch方法映射为组件的属性对象
 */
function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);

      const { getState, subscribe, dispatch } = store;

      const prevState = getState();

      const stateProps = React.useMemo(() => {
        return mapStateToProps(prevState);
      }, [prevState]);

      const dispatchProps = React.useMemo(() => {
        let dispatchProps = {};
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(
            mapDispatchToProps,
            store.dispatch
          );
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch]);

      const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

      React.useLayoutEffect(() => {
        return subscribe(forceUpdate);
      }, []);

      return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

export default connect;
