import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar"
import UserMenu from "../UserMenu/UserMenu"
import { useSelector } from 'react-redux';
import "./UserSchedule.css"
import Login from "../../Login/Login";
import { Axios } from "axios";
import UserScheduleContent from "./ContentPage/UserScheduleContent";

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
      <UserScheduleContent/>
    </section>
  );
};
export default UserSchedule