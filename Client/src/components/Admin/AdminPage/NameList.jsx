import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";

function NameList() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h1>Content NameList Page</h1>
      </div>
    </section>
  );
}

export default NameList;
