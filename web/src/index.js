import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "./scss/style.scss";

import MainForm from "./components/MainForm";

if (localStorage.version !== "1.0") {
  localStorage.clear();
  localStorage.lang = "zh_CN";
  localStorage.uuid = "OPCI_0000_00";
  
  localStorage.version = "1.0";
}

ReactDOM.render(<MainForm route="Home" />, document.getElementById("root"));

serviceWorker.unregister();
