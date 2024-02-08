import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import EditCoursepage  from "../../page/EditCoursePage";

function EditCourse() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <div>
      <EditCoursepage />
      </div>
    </section>
  );
}

export default EditCourse;
