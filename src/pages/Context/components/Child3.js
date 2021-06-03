import React from "react";
import { ThemeConsumer } from "../context";

function Child3() {
  return (
    <div>
      <ThemeConsumer>
        {(ctx) => (
          // 这个函数接收当前的 context 值，返回一个 React 节点
          <div style={{ color: ctx.themeColor }}>子组件 3：使用Consumer</div>
        )}
      </ThemeConsumer>
    </div>
  );
}

export default Child3;
