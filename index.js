import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "../vendor/bs-custom-file-input";

import "./style.css"

const jsx =  (
      <App />
  );

ReactDOM.render(jsx, document.getElementById("root"))