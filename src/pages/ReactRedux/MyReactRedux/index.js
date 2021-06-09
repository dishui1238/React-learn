import React, {
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";

const Context = React.createContext();

// connect 是一个高阶组件
export const connect =
  (mapStateToProps = (state) => state, mapDispatchToProps) =>
  (WrappendComponent) =>
  (props) => {
    const store = useContext(Context);
    const { dispatch, getState, subscribe } = store;

    const stateProps = mapStateToProps(getState());
    // console.log("stateProps", stateProps, getState());

    let dispatchProps = { dispatch };

    // forceUpdate 引起函数组件的强制更新
    // https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    // 这种也可以强制更新，保证 state 前后不一样， 使用: forceUpdate({})
    // const [, forceUpdate] = useState({});

    const forceUpdate = useForceUpdate();

    if (typeof mapDispatchToProps === "function") {
      // 参数为函数
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      // 参数为对象
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    // 订阅更新
    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [store, forceUpdate, subscribe]);

    return <WrappendComponent {...props} {...stateProps} {...dispatchProps} />;
  };

/**
 * useForceUpdate 自定义 hook
 */
function useForceUpdate() {
  const [, setState] = useState(0);
  const update = useCallback(() => setState((prev) => prev + 1), []);
  return update;
}

/**
 * Provider 组件
 */
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

/**
 *  bindActionCreators
 * 惟一会使用到 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它
 */
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// 在函数外包裹上一层 dispatch
function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

// ==========================hooks 版本====================================================
function useStore() {
  const store = useContext(Context);
  return store;
}
export function useSelector(selector) {
  const store = useStore();

  const { getState, subscribe } = store;
  const selectedState = selector(getState());

  // 订阅更新
  const forceUpdate = useForceUpdate();
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => forceUpdate());

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [subscribe, forceUpdate]);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
