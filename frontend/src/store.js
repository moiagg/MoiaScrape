import { createStore, applyMiddleware } from "redux";

import reducer from "./reducer";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

const InitialState = {};

const middleware = [thunk];

export const initStore = (initialState = InitialState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
