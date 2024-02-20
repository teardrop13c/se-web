import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import RegisterContent from './ContentPage/RegisterContent'

function UserRegister() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <RegisterContent />
    </section>
  )
}

export default UserRegister