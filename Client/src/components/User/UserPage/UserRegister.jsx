import React from 'react'
import Navbar from '../../Navbar'
import UserMenu from '../UserMenu/UserMenu'
import RegisterContent from './ContentPage/RegisterContent'
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";

function UserRegister() {
    //authuser
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
    const OnOffReg = useSelector((state) => state.var.OnOffReg); 
  
    if (!isLoggedIn) {
      return <Login />;
    }
    else if(!OnOffReg){
      console.log(OnOffReg)
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