// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // <- REQUIRED: make sure this line exists

import Main from "./home/main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);