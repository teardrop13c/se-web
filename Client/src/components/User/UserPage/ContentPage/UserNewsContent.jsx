import React, { useState } from 'react';
import './UserNewsContent.css';

function NewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear input values on modal close
    setNewsTitle('');
    setNewsContent('');
  };

  const handlePostNews = () => {
    // Handle the logic for posting news
    console.log('News Title:', newsTitle);
    console.log('News Content:', newsContent);
    // Add your logic for posting news here
    handleCloseModal();
  };

  return (
    <section id="main-News">
      <div className="roundedRectangle">
        <p className="facultyText">ข่าวสาร</p>
        <button className="createNewsButton" onClick={handleOpenModal}>
          สร้างข่าว
        </button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>กรุณาใส่หัวข้อข่าว</h2>
              <input
                type="text"
                placeholder="หัวข้อข่าว"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
              />
              <textarea
                placeholder="เนื้อหาข่าว"
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
              ></textarea>
              <div className="modal-actions">
                <button onClick={handleCloseModal}>ปิด</button>
                <button onClick={handlePostNews}>โพสต์</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsPage;
