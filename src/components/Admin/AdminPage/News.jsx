import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import NewsContent from "./ContentPage/NewsContent";
import { useSelector } from 'react-redux'; // เพิ่มการ import useSelector
import { Navigate } from "react-router-dom";

function News() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // เข้าถึงค่า isLoggedIn จาก Redux store

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <NewsContent />
    </section>
  );
}

export default News;
