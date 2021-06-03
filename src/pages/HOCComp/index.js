import React from "react";

// HOC 参数为组件，返回一个组件
const foo = (Comp) => (props) => {
  return (
    <div style={{ border: "1px solid red", padding: "8px" }}>
      <Comp {...props} />
    </div>
  );
};

const Comp = (props) => {
  return (
    <div style={{ border: "1px solid red" }}>Comp组件name-{props.name}</div>
  );
};

const Foo = foo(Comp);
export default function Index() {
  return <Foo name="foo" />;
}
