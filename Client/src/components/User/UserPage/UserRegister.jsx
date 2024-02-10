import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'

function UserRegister() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div className="content">
        <h2>Register Page</h2>
      </div>
    </section>
  )
}

export default UserRegister