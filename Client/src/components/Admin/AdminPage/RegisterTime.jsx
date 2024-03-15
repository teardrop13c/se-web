import React from 'react'
import Navbar from '../../Navbar'
import AdminMenu from '../AdminMenu/AdminMenu'
import RegisterTimePage from "./ContentPage/RegisterTimePage";
import { useSelector } from 'react-redux';
import Login from '../../Login/Login';

function RegisterTime() {
  //auth
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  if (!isLoggedIn || (profile?.name !== 'Admin007')) {
    return <Login />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <RegisterTimePage />
      </div>
    </section>
  )
}

export default RegisterTime;