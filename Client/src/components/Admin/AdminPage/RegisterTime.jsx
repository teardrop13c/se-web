import React from 'react'
import Navbar from '../../Navbar'
import AdminMenu from '../AdminMenu/AdminMenu'
import RegisterTimePage from "./ContentPage/RegisterTimePage";

function RegisterTime() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
      <RegisterTimePage/>
      </div>
    </section>
  )
}

export default RegisterTime;