import React from "react";
import { RouterContex } from "../contex";

// withRouter 高阶组件 用于函数组件

const withRouter = (WrappedComponent) => (props) => {
  return (
    <RouterContex.Consumer>
      {(context) => {
        return <WrappedComponent {...props} {...context} />;
      }}
    </RouterContex.Consumer>
  );
};
export default withRouter;
