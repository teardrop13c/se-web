import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import DatePick from './ContentPage/DatePick'

function UserDatePick() {
  return (
    <section id="main-layout">
        <Navbar />
        <UserMenu />
        <DatePick />
    </section>
  )
}

export default UserDatePick