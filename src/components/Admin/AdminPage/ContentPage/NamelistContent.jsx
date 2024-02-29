import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCommentDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./NamelistContent.css";

// New component for the dividing line
const Divider = () => (
  <div className="namelist-divider"></div>
);

function NamelistContent() {
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    // สร้างชื่อผู้ใช้สุ่ม
    const generateRandomUser = () => {
      const randomFirstName = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
      const randomLastName = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];

      const firstName = randomFirstName[Math.floor(Math.random() * randomFirstName.length)];
      const lastName = randomLastName[Math.floor(Math.random() * randomLastName.length)];

      return `${firstName} ${lastName}`;
    };

    //ตัวอย่างรอใส่ชื่อ database อาจารย์
    setRandomUsers([generateRandomUser(), generateRandomUser(), generateRandomUser()]);
  }, []);

  return (
    <>
      <div className="namelist-rounded-rectangle">
        <div className="name-container">
          <p className="moved-text">Name</p>
          <div className="user-frame">
            {randomUsers.map((user, index) => (
              <div key={index} className="user-name-wrapper">
                <p className="user-name">{user}</p>
              </div>
            ))}
          </div>
          <p className="move-textemail">Email-Phone Number</p>
        </div>
        <Divider /> {/* Add the divider component */}
        <button className="schedule-icon">
          <FontAwesomeIcon icon={faCalendarDays} />
        </button>
        <Divider />
        <button className="comment-icon">
          <FontAwesomeIcon icon={faCommentDots} />
        </button>
        <Divider />
        <button className="bin-icon">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
}

export default NamelistContent;
