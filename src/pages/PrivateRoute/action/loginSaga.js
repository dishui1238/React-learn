import LoginService from "../service/login";
import { LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE, REQUEST } from "./const";
import { call, fork, put, takeEvery, take } from "redux-saga/effects";

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle); // 可以处理多次 saga 任务
  // 等同于下面
  // while (true) {
  //   // call 阻塞型任务 后面的代码要等执行结果出来后才执行
  //   // fork 非阻塞型任务 后面的代码不等待直接执行
  //   const action = yield take(LOGIN_SAGA); // 只能处理一次 saga 任务
  //   yield call(loginHandle, action);
  // }
}

// 用 take 实现 takeEvery
const takeEvery2 = (pattern, saga, ...args) => { 
  fork(function* () {
    while (true) {
      const action = yield take(LOGIN_SAGA); // 只能处理一次 saga 任务
      yield fork(loginHandle, action);
    }
  });
};

// work sage
function* loginHandle(action) {
  try {
    yield put({ type: REQUEST });
    const res1 = yield call(LoginService.login, action.payload);
    const res2 = yield call(LoginService.getMoreUserInfo, res1);
    yield put({ type: LOGIN_SUCCESS, payload: res2 });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error });
  }
}

export default loginSaga;
