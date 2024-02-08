import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import NamelistPage from "../../page/NamelistPage";

function Namelist() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <div>
      <NamelistPage />
      </div>
    </section>
  );
}

export default Namelist;
