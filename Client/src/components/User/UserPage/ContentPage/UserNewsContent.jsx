import React, { useState } from 'react';
import axios from 'axios';
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
    setNewsTitle('');
    setNewsContent('');
  };

  const handlePostNews = () => {
    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์ Express
    const postData = {
      title: newsTitle,
      content: newsContent
    };

    // ทำการโพสต์ข้อมูลไปยังเซิร์ฟเวอร์ Express
    axios.post('http://localhost:5173/UserNews', postData)
      .then(response => {
        console.log(response.data);
        // ตรวจสอบว่าโพสต์ข่าวสำเร็จหรือไม่
        if (response.status === 200) {
          console.log('โพสต์ข่าวสำเร็จ');
          handleCloseModal();
        } else {
          console.error('เกิดข้อผิดพลาดในการโพสต์ข่าว');
        }
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการโพสต์ข่าว:', error);
      });
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
