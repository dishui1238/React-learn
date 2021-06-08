import React, { Component } from "react";
import store from "./store";

/**
 * 你应该把要做的修改变成一个普通对象，这个对象被叫做 action，而不是直接修改 state。然后编写专门的函数来决定每个
 * action 如何改变应用的 state，这个函数被叫做 reducer
 *
 * Redux 只有一个单一的 store 和一个根级的 reduce 函数
 *
 */

class Index extends Component {
  componentDidMount() {
    // 订阅更新
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }
  add = () => {
    store.dispatch({ type: "counter/ADD" });
  };
  minus = () => {
    store.dispatch({ type: "counter/MINUS" });
  };
  asyncAdd = () => {
    // 只支持 dispatch 一个对象
    // setTimeout(() => {
    //   store.dispatch({ type: "counter/ADD" });
    // }, 1000);
    // dispatch 一个函数需要使用中间件
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "counter/ADD" });
      }, 1000);
    });
  };
  render() {
    return (
      <div style={{ border: "1px solid red", marginLeft: 10 }}>
        <h3>Redux使用与实现</h3>
        <p>{store.getState().value}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.asyncAdd}>async add</button>
      </div>
    );
  }
}

export default Index;
