import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./Routes";

ReactDOM.render(<AppRoutes />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
