import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "./MyReactRedux";


class ReactReduxPage extends Component {
  render() {
    const { num, add, minus } = this.props;
    return (
      <div style={{ border: "1px solid #000", marginLeft: 10 }}>
        <h4>ReactRedux实现</h4>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { num: state.count };
};
const mapDispatchToProps = {
  add: () => {
    return { type: "ADD" };
  },
  minus: () => {
    return { type: "MINUS" };
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
