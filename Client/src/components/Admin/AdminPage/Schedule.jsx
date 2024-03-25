import React, { useState } from "react";
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import "./Schedule.css";
import { useSelector } from 'react-redux';
import Login from "../../Login/Login";

function Schedule() {
  // Auth
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  if (!isLoggedIn || (profile?.name !== 'Admin007')) {
    return <Login />;
  }

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const teachers = ["อาจารย์ A", "อาจารย์ B", "อาจารย์ C"];

  const handleTeacherSelect = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleExport = () => {
    // Add your export logic here (e.g., download CSV, send data to server)
    console.log("Exporting data...");
  };

  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h1>รายชื่ออาจารย์</h1>
        <div className="button-container">
          <select
            className="dropdown"
            value={selectedTeacher}
            onChange={handleTeacherSelect}
          >
            {teachers.map((teacher) => (
              <option key={teacher} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
          <button className="popup-button" onClick={handlePopupOpen}>
            จัดตาราง
          </button>
          <button className="export-button" onClick={handleExport}>
            Export
          </button>
        </div>
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2>ข้อมูลอาจารย์</h2>
              <p>
                อาจารย์ที่เลือก: {selectedTeacher}
              </p>
              <button className="close-button" onClick={handlePopupClose}>
                ปิด
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Schedule;
