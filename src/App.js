import Context from "./pages/Context";
import HOCPage from "./pages/HOCComp";
import FormComp from "./pages/FormComp";
import ReduxPage from "./pages/Redux";

import ReactReduxPage from "./pages/ReactRedux";
import ReactReduxHookPage from "./pages/ReactRedux/hookPage";
// import { Provider } from "react-redux";
import { Provider } from "./pages/ReactRedux/MyReactRedux";
import store from "./pages/ReactRedux/stores";

import "./index.less";

function App() {
  return (
    <div className="app" style={{ display: "flex" }}>
      {/* 1. react 跨层级通信 context */}
      <Context />
      {/* 2. 高阶组件 */}
      <HOCPage />
      {/* 3. 手写 Form 组件 */}
      <FormComp />
      {/* 4. redux */}
      <ReduxPage />
      {/* 5. react-redux */}
      <Provider store={store}>
        <ReactReduxPage />
        {/* hook 版的 react-redux */}
        <ReactReduxHookPage />
      </Provider>
    </div>
  );
}

export default App;
