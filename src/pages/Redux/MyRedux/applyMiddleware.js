export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let { dispatch } = store;

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args), // 当前作用域下的 dispatch
    };

    // [thunk(midApi), logger(midApi)] 返回一个函数
    // [dispatch=> {}, dispatch=>{}]
    const middlewareChain = middlewares.map((middleware) => middleware(midApi));

    // 加强版的 dispatch
    // logger(midApi)(thunk(midApi))(dispatch)
    // logger(midApi)(dispatch(action))
    dispatch = compose(...middlewareChain)(store.dispatch);

    function compose(...funcs) {
      if (funcs.length === 0) {
        return (arg) => arg;
      }
      if (funcs.length === 1) {
        return (arg) => funcs[0](...arg);
      }
      return funcs.reduce(
        (a, b) =>
          (...args) =>
            b(a(...args))
      );
    }

    return {
      ...store,
      // 加强版的 dispatch
      dispatch,
    };
  };
}
