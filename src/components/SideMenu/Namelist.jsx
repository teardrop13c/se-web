import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Namelist() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <div>
        <h1>Content Namelist Page</h1>
        <h2>Hello World</h2>
      </div>
    </section>
  );
}

export default Namelist;
