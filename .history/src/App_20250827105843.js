import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
// 如需多页：import Archive from "./pages/Archive";

export default function App() {
  return (
    <div className="site">
      <Header />
      <main className="main">
        <Home />
        {/* <Archive />  // 需要时再挂 */}
      </main>
      <Footer />
    </div>
  );
}