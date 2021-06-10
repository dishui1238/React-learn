import React, { Component } from "react";
import { RouterContex } from "../contex";

class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    // 监听路由
    this.unlisten = props.history.listen((location) => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    return (
      <RouterContex.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        {this.props.children}
      </RouterContex.Provider>
    );
  }
}

export default Router;
