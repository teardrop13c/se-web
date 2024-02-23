import React from 'react'
import Navbar from '../../Navbar'
import AdminMenu from '../AdminMenu/AdminMenu'

function RegisterTime() {
  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h2>RegisterTime Page</h2>
      </div>
    </section>
  )
}

export default RegisterTime;