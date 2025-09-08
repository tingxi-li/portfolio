// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // <- REQUIRED: make sure this line exists
import App from "./App"; // <- REQUIRED: make sure this line exists
import Main from "./home/main";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <Main />
    <Footer />
  </>
);
