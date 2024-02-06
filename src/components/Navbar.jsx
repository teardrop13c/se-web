import React from 'react';
import "./Navbar.css";

function Navbar() {
  return (
    <section id="header">
      <div className="header">
        <div className="container">
          <div className="header-logo">
            <img
              src="https://edureq.src.ku.ac.th/image/KU_SRC_Color_bg_white.jpg"
              alt="KU Logo"
              style={{ width: "80px" }}
            />
            <p className="header-center">
              ระบบลงทะเบียนการสอน มหาวิทยาลัยเกษตรศาสตร์
            </p>
            <div className="header-end">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2073.png?alt=media&token=274beb4d-0b29-4f61-bbfc-a3cf27b7b00f"
                alt="Profile"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar