import React, { Component } from "react";
import { ThemeProvider } from "./context";
import Child1 from "./components/Child1";
import Child2 from "./components/Child2";
import Child3 from "./components/Child3";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: { themeColor: "red" } };
  }
  render() {
    const { theme } = this.state;
    return (
      <div style={{ border: "1px solid #000" }}>
        <h3>react 组件跨层级通信 context</h3>
        {/* 
          Provider 接收一个 value 属性，传递给消费组件，允许消费组件订阅 context 的变化
         */}
        <ThemeProvider value={theme}>
          <Child1 />
          <Child2 />
          <Child3 />
        </ThemeProvider>
      </div>
    );
  }
}

export default Index;
