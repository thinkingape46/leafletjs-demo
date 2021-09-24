import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <>
      <p>Hello</p>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
