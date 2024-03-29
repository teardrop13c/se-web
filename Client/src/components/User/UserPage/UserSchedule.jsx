import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar"
import UserMenu from "../UserMenu/UserMenu"
import { useSelector } from 'react-redux';
import "./UserSchedule.css"
import Login from "../../Login/Login";
import  Axios  from "axios";
import Card from "antd/es/card/Card";

const UserSchedule = () => {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Login />;
  }
  const [userCompleteData, setUserCompleteData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when component mounts
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/schedule/user_complete');
        setUserCompleteData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div>
        <h1>ตารางสอน</h1>
        {userCompleteData.map((userData, index) => (
          <Card style={{ background: "#d9d9d9" }}>
            วิชา {userData.subjectReg_id} {userData.day} ห้อง {userData.room_id} สาขาที่เปิด {userData.major_year} ชั้นปีที่เปิด {userData.student_year}
          </Card>
        ))}

      </div>
    </section>
  );
};
export default UserSchedule