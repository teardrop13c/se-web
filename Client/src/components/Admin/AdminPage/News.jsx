import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import NewsContent from "./ContentPage/NewsContent";
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";
import { useDispatch } from "react-redux";
import { setOnReg } from "../../../../Store/varSlice";
function News() {
  //auth
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  if (!isLoggedIn || (profile?.name !== 'Admin007')) {
    return <Login />;
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
