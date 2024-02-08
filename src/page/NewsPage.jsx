import React from "react";
import "./NewsPage.css"; 

function NewsPage() {
    return (
        <section id="main-layout">
      <div className="rounded-rectangle">
        <p className="faculty-text">ข่าวสาร</p>
        <div className="file-upload">
          <label htmlFor="fileInput">สร้างข่าว</label>
        </div>
      </div>
    </section>
    );
  }
  
  export default NewsPage;