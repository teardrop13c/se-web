import React from "react";
import Navbar from "../Navbar";
import UserMenu from "./UserMenu/UserMenu";
import Clock from "../Clock";

function HomeUser() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <Clock />
    </section>
  );
}

export default HomeUser;
