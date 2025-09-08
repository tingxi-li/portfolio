// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Bio from "./home/bio";
import "./index.css"; // <- REQUIRED: make sure this line exists

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <Bio />
  </>
);