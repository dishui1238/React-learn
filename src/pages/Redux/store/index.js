// import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "../MyRedux";

function countReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case "counter/ADD":
      console.log("state.value", state.value);
      return { value: state.value + 1 };

    case "counter/MINUS":
      return { value: state.value - 1 };

    default:
      return { value: 0 };
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;
