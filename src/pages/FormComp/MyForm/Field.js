import React, { Component } from "react";
import { FieldContext } from "./Context";

class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregisterEntity = this.context.regiesterEntity(this);
  }

  componentWillUnmount() {
    if (this.unregisterEntity) {
      this.unregisterEntity();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { getFieldValue, setFieldValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        setFieldValue({ [name]: e.target.value });
      },
    };
  };

  // React.cloneElement(element, props,[...children])
  // 以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果
  render() {
    const { children } = this.props;
    return React.cloneElement(children, this.getControlled());
  }
}

export default Field;
