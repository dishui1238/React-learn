import React, { Component } from "react";
import { RouterContex } from "../contex";
import matchPath from "./matchPath";

class Route extends Component {
  static contextType = RouterContex;

  render() {
    const { path, component, children, render, computedMatch } = this.props;
    const {
      history: { location },
    } = this.context;
    const match = path
      ? computedMatch
        ? computedMatch
        : matchPath(location.pathname, this.props)
      : this.context.match;

    const props = { ...this.context, match, location };

    // 匹配：处理优先级 children,component,render
    // 不匹配：处理 children(function)

    return (
      // 使子组件获取最近的值，useRouteMatch
      <RouterContex.Provider value={props}>
        {match
          ? children
            ? typeof children === "function"
              ? children(props)
              : children
            : component
            ? React.createElement(component)
            : render
            ? render(props)
            : null
          : typeof children === "function"
          ? children(props)
          : null}
      </RouterContex.Provider>
    );
  }
}

export default Route;
