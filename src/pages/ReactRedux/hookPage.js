import React, { useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "./MyReactRedux";

export default function ReactReduxHookPage({ value }) {
  // !获取 dispatch
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, [dispatch]);

  // !获取 state
  const count = useSelector(({ count }) => count);

  return (
    <div style={{ border: "1px solid #000", marginLeft: 10 }}>
      <h4>ReactRedux Hook版</h4>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  );
}
