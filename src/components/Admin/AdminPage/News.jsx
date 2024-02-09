import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import NewsContent from "./ContentPage/NewsContent";

function News() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <NewsContent />
    </section>
  );
}

export default News;
