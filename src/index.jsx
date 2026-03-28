// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import 'antd/dist/reset.css';
import "./global.css"; // <- REQUIRED: make sure this line exists
import App from "./App"; // <- REQUIRED: make sure this line exists


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
