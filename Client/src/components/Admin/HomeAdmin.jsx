import React from "react";
import Navbar from "../Navbar";
import AdminMenu from "./AdminMenu/AdminMenu";

function HomeAdmin() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h2>Home Admin</h2>
      </div>
    </section>
  );
}

export default HomeAdmin;
