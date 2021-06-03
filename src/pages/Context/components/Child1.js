import React, { Component } from "react";
import { ThemeContext } from "../context";

/**
 * contextType
 * 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。此属性能让你使用 this.context 来消费最近 Context 上的那个值
 *
 * ! contextType挂载在 class 组件上， function 组件不能使用
 * ! 只能订阅单个 context
 *
 */
class Child1 extends Component {
  static contextType = ThemeContext;

  render() {
    const { themeColor } = this.context;
    console.log(this);
    return (
      <div>
        <p style={{ color: themeColor }}>子组件 1：使用contextType</p>
      </div>
    );
  }
}

export default Child1;
