import Context from "./pages/Context";
import HOCPage from "./pages/HOCComp";
import FormComp from "./pages/FormComp";
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
    </div>
  );
}

export default App;
