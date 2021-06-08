// thunk增加了处理函数型action的能⼒

export default function thunk({ getState }) {
  return (dispatch) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState); // 直接执行该函数
    }
    return dispatch(action);
  };
}
