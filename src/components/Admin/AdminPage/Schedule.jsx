import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import "./Schedule.css";

function Schedule() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h1>Content Schedule Page</h1>
      </div>
    </section>
  );
}

export default Schedule;
