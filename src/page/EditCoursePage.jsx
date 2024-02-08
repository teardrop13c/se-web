import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./EditCoursepage.css";

function EditCoursepage() {
    const [additionalButtons, setAdditionalButtons] = useState([]);
  
    const handleUpload = () => {
      console.log("Upload button clicked");
    };
  
    const handleDownload = () => {
      console.log("Download button clicked");
    };
  
    const handleDelete = () => {
      console.log("Delete button clicked");
    };
  
    const handleAdd = () => {
      setAdditionalButtons((prevButtons) => [
        ...prevButtons,
        {
          id: additionalButtons.length + 1, // กำหนด id
          active: true, // กำหนดสถานะ active
        },
      ]);
    };
  
    const handleAdditionalButtonClick = (buttonId) => {
      
      const clickedButton = additionalButtons.find((button) => button.id === buttonId);
  
      if (clickedButton) {
        if (clickedButton.active) {
          handleUpload();
        } else {
          console.log("This button is not active");
        }
      }
    };
  
    return (
      <section id="main-layout">
        <div className="rounded-rectangle">
          <p className="faculty-text">default</p>
  
          {/* File Upload Section */}
          <div className="file-upload">
            <label htmlFor="fileInput">Upload</label>
            <input type="file" id="fileInput" name="fileInput" accept=".pdf, .doc, .docx" />
          </div>
        </div>
  
        {/* Download Button */}
        <div className="download-button">
          <button className="download-btn" onClick={handleDownload}>
            Download
          </button>
        </div>
  
        {/* Delete and Add Buttons */}
        <div className="delete-button">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="add-btn" onClick={handleAdd}>
            +
          </button>
        </div>
  
        {/* Additional Buttons */}
        {additionalButtons.map((button) => (
          <div key={button.id} className="additional-button">
            <button onClick={() => handleAdditionalButtonClick(button.id)} disabled={!button.active}>
              Upload
            </button>
            <button onClick={() => handleAdditionalButtonClick(button.id)} disabled={!button.active}>
              Download
            </button>
            <button onClick={() => handleAdditionalButtonClick(button.id)} disabled={!button.active}>
              Delete
            </button>
          </div>
        ))}
      </section>
    );
  }
  
  export default EditCoursepage;