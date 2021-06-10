import React, { Component } from "react";
import { RouterContex } from "../contex";
import matchPath from "./matchPath";

// 独占路由组件， 渲染与该地址匹配的第一个子节点<Route>或者<Redirect>
class Switch extends Component {
  static contextType = RouterContex;

  render() {
    // const { location } = this.contextType;
    const location = this.props.location || this.context.location;
    let match; // 标记匹配 { path: "/", url: "/", isExact: true, params: {} };
    let element; // 记录匹配的元素

    React.Children.forEach(this.props.children, (child) => {
      if (match == null && React.isValidElement(child)) {
        match = child.props.path
          ? matchPath(location.pathname, child.props)
          : this.context.match;
        element = child;
      }
    });
    console.log("match", location.pathname, match);

    return match ? React.cloneElement(element, { computedMatch: match }) : null;
  }
}

export default Switch;
