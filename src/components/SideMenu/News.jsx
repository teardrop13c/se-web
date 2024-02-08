import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import NewsPage  from "../../page/NewsPage";

function News() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <div>
      <NewsPage />
      </div>
    </section>
  );
}

export default News;
