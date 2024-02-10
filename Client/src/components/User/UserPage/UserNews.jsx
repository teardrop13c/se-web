import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'

function UserNews() {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div className="content">
        <h2>News Page</h2>
      </div>
    </section>
  )
}

export default UserNews