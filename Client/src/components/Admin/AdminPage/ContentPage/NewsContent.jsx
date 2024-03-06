import React from 'react'
import "./NewsContent.css"
import { useState } from 'react';

function NewsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const Modal = ({ children }) => {
    return (
      <div className="modal">
        <div className="modal-overlay"></div>
        {children}
      </div>
    );
  };
  return (
    <>
      <div className="rounded-rectangle">
        <p className="faculty-text">ข่าวสาร</p>
        <button  className="create-news-button" onClick={handleOpenModal}>สร้างข่าว</button>
        {isModalOpen && (
        <Modal>
          <div className="modal-content">
            <h2>กรุณาใส่หัวข้อข่าว</h2>
            <input type="text" placeholder="หัวข้อข่าว" />
            <textarea placeholder="เนื้อหาข่าว"></textarea>
            <div className="modal-actions">
              <button onClick={handleCloseModal}>ปิด</button>
              <button>โพสต์</button>
            </div>
          </div>
        </Modal>
      )}
      </div>
    </>
  )
}

export default NewsContent;