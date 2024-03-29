import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import EditCourseContent from "./ContentPage/EditCourseContent";
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";


function EditCourse() {
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
      <EditCourseContent />
    </section>
  );
}

export default EditCourse;
