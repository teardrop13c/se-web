import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EditCoursepage.css"; // Import the separate CSS file

function EditCoursepage() {
  return (
    <section id="main-layout">
      <div className="rounded-rectangle">
        <p className="faculty-text">ชื่อคณะ</p>

        {/* Dropdown Section */}
        <div className="dropdown">
          <button className="dropbtn">ปีหลักสูตร</button>
          <div className="dropdown-content">
            <a href="#option1">ปี 55</a>
            <a href="#option2">ปี 60</a>
            <a href="#option3">ปี 65</a>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="file-upload">
          <label htmlFor="fileInput">Upload</label>
          <input type="file" id="fileInput" name="fileInput" accept=".pdf, .doc, .docx" />
        </div>
      </div>
    </section>
  );
}

export default EditCoursepage;
