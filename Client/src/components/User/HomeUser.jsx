import React from "react";
import Navbar from "../Navbar";
import UserMenu from "./UserMenu/UserMenu";

function HomeUser() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div className="content">
        <h2>Home User</h2>
      </div>
    </section>
  );
}

export default HomeUser;
