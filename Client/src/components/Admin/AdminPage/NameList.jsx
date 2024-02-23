import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import NamelistContent from "./ContentPage/NamelistContent";

function NameList() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <NamelistContent />
    </section>
  );
}

export default NameList;
