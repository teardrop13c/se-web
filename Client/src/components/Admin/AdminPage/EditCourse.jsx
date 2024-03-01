import React from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import EditCourseContent from "./ContentPage/EditCourseContent";

function EditCourse() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <EditCourseContent />
    </section>
  );
}

export default EditCourse;
