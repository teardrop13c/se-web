import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function News() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <div>
        <h1>Content News Page</h1>
        <h2>Hello World</h2>
      </div>
    </section>
  );
}

export default News;
