import React, { useState, useEffect } from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import RegisterContent from './ContentPage/RegisterContent'
import { useSelector } from 'react-redux';
import Login from "../../Login/Login";
import Axios from 'axios';
import HomeUser from './HomeUser';
function UserRegister() {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/getTimes');
        const data = response.data;  // assuming data is an array of objects
        if (data && data.length > 0) {
          setOpeningTime(data[0].timeStart);
          setClosingTime(data[0].timeEnd);
        } else {
          console.error('Empty or invalid data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTimes();
  }, []);
  if (!isLoggedIn) {
    return <Login />;
  }
  else if (!(currentDateTime >= new Date(openingTime) && currentDateTime <= new Date(closingTime))) {
    return <HomeUser />;
  }
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <RegisterContent />
    </section>
  )
}

export default UserRegister