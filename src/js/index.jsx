import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.jsx";
import Career from "./components/career.jsx";

import Style from "../css/style.css";

ReactDOM.render(
  <div>
    <Header />
    <Career />
  </div>,
  document.getElementById("app")
);