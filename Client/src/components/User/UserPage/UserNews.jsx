import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import UserNewsContent from './ContentPage/UserNewsContent'

function UserNews() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <UserNewsContent />
    </section>
  )
}

export default UserNews