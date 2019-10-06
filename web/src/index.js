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

const umeng = document.createElement("script");
umeng.src = "https://v1.cnzz.com/z_stat.php?id=1278083824&web_id=1278083824";
umeng.language = "JavaScript";
umeng.id = "cnzz";
document.body.appendChild(umeng);

serviceWorker.unregister();
