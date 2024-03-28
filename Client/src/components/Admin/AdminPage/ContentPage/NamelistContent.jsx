import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCommentDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./NamelistContent.css";
import Axios from 'axios';
import { Button} from 'antd';

// New component for the dividing line
const Divider = () => (
  <div className="namelist-divider"></div>
);

function NamelistContent() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUser();
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const getUser = () => {
    Axios.get('http://localhost:3001/api/profile').then((response) => {
      setUserList(response.data);
    });
  }

  

  const deleteUser = (user_email, user_name) => {
    Axios.delete(`http://localhost:3001/api/profile/delete/${user_email}/${user_name}`).then(() => {
      setUserList(prevUserList => prevUserList.filter((val) => {
        return val.user_email !== user_email && val.user_name !== user_name;
      }));
    }).catch(error => {
      console.error('Error deleting user:', error);
    });
  }

  return (
    <>
      <div className="namelist-rounded-rectangle">
        <div className="name-container"> 
          <p className="moved-text">Name</p>
          <div className="user-frame">
            {userList.map((val, key) => (
              <div className="user-name-wrapper" key={key}>
                <p className="user-name"> {val.user_name}</p>
              </div>
            ))}
          </div>
          <p className="move-textemail">Email-Phone Number</p>
          <div className="email-frame">
            {userList.map((val, key) => (
              <div className="user-name-wrapper" key={key}>
                <p className="user-name"> {val.user_email}  -  เบอร์: {val.user_phone}
                <Button  onClick={() => deleteUser(val.user_email, val.user_name, val.user_phone)}>
                ลบ
                </Button>
                </p>
              </div>
            ))}
          </div>
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