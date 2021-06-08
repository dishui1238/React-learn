export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // enhancer 是 applyMiddleware(thunk, logger) 的结果，其结果是一个函数
    // enhancer 用于加强 store 的 dispatch
    return enhancer(createStore)(reducer);
  }
  let currentState = {};
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listerner) => listerner());
    return action;
  }

  function subscribe(listerner) {
    if (listerner) {
      currentListeners.push(listerner);
    }
    return () => {
      currentListeners = [];
    };
  }

  // 初始化执行一次，派发初始值
  dispatch({ type: "REDUX_INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
