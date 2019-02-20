import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { MainNav, SalePage } from "./App";
import { createStore } from "./redux";

const initialState = {
  selectedOption: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_PICKUP":
      return { ...state, selectedOption: action.payload.pickupId };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const selectOption = id => () => {
  const action = { type: "SELECT_PICKUP", payload: { pickupId: id } };
  store.dispatch(action);
};

ReactDOM.render(
  <MainNav
    selectOption={selectOption}
    selectedOption={store.getState().selectedOption}
    subscribeToReduxStateChanges={store.subscribe}
  />,
  document.getElementById("nav")
);
ReactDOM.render(
  <SalePage
    selectedOption={store.getState().selectedOption}
    subscribeToReduxStateChanges={store.subscribe}
  />,
  document.getElementById("page")
);
