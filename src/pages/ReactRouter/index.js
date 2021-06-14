import React, { Component } from "react";
// import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { BrowserRouter, Link, Route, Switch } from "./MyReactRouterDom";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";

/**
 * ! react-router中奉行一切皆组件的思想，路由器-Router、链接-Link、路由-Route、独占-Switch、重定向-Redirect都以组件形式存在
 *
 * Route渲染内容的三种方式: Route渲染优先级：children>component>render
 *
 *
 *
 * 1. BrowserRouter
 * <BrowserRouter> 使用 HTML5 提供的 history API ( pushState , replaceState 和 popstate 事件)来保持
 * UI 和 URL 的同步。
 * 参数 basename: string，所有URL的base值。
 *
 * 2. HashRouter
 * <HashRouter> 使用 URL 的 hash 部分（即 window.location.hash ）来保持 UI 和 URL 的同步
 *
 * 3. MemoryRouter
 * 把 URL 的历史记录保存在内存中的 <Router> （不读取、不写入地址栏）。在测试和非浏览器环境中很有用，如React Native。
 *
 *
 * ! BrowserRouter与HashRouter对比
 *  1. HashRouter最简单，不需要服务器端渲染，靠浏览器的#的来区分path就可以，BrowserRouter需要服务器端对不同的URL返回不同的HTML，后端配置。
 * 2. BrowserRouter使用HTML5 history API（ pushState，replaceState和popstate事件，让页面的UI同步与URL。
 * 3. HashRouter不支持location.key和location.state，动态路由跳转需要通过?传递参数。
 * 4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 browserHistory 。
 *
 */

export default class RouterPage extends Component {
  state = { count: 0 };
  render() {
    const { count } = this.state;

    return (
      <div style={{ border: "1px solid #000", marginLeft: 10 }}>
        <h3>RouterPage</h3>
        <button onClick={() => this.setState({ count: count + 1 })}>
          按钮
        </button>
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to="/user2">用户中心2</Link>
          </nav>
          {/* 根路由要添加exact，实现精确匹配 */}
          {/* <Route exact path="/" component={HomePage} />
          <Route path="/user" component={UserPage} /> */}
          <Switch>
            {/* 根路由要添加exact，实现精确匹配 */}
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={UserPage} />
            {/*  这种方式点击按钮组件会一直挂载、卸载，影响性能 */}
            {/* 
            当你用 component 的时候，Route会用你指定的组件和React.createElement创建一个新的[Reactelement]。这意味着当你提供的是一个内联函数的时候，每次render都会创建一个新的组件。这会导致不再更新已经现有组件，而是直接卸载然后再去挂载一个新的组件。因此，当用到内联函数的内联渲染时，请使用render或者children。
            */}
            <Route path="/user2" component={() => <UserPage />} />
            {/* 404 没有 path 需要放最后 */}
            <Route render={() => <h1>404</h1>} />
          </Switch>

          <p>{this.state.count}</p>
        </BrowserRouter>
      </div>
    );
  }
}
