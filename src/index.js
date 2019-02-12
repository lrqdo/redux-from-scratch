import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import { MainNav, SalePage } from "./App";

ReactDOM.render(<MainNav />, document.getElementById("nav"));
ReactDOM.render(<SalePage />, document.getElementById("page"));
