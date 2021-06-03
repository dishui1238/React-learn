import React, { useContext } from "react";
import { ThemeContext } from "../context";

// useContext 接收一个 context 对象（ React.createContext 的返回值）并返回该 context 的当前值
function Child2() {
  const { themeColor } = useContext(ThemeContext);
  return (
    <div>
      <p style={{ color: themeColor }}>子组件 2：使用 useContext</p>
    </div>
  );
}

export default Child2;
