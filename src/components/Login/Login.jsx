import { useState,useEffect } from 'react';
import {GoogleLogin,GoogleLogout} from 'react-google-login'
import React from 'react'
import{gapi} from 'gapi-script'
import { Link } from 'react-router-dom';

function Login() {
  //ตัวที่ขอใช้google
  const clientId = "547931595657-oaphvpiui1527babqslkcbb93a9p938o.apps.googleusercontent.com"
  //ต้องใช้nullไม่งั้นจะเกิดบัค
  const [profile, setProfile] = useState(null)

  useEffect(()  => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2",initClient)
  })
  //loginได้
  const onSucess = (res) => {
    setProfile(res.profileObj)
    console.log('sucess',res)
  }
  //loginไม่ได้
  const onFailure = (res) => {
    console.log('failed',res)
  }
  //ทำให้ค่าreset setProfile
  const logOut = ()  => {
    setProfile(null);
  }
  const getProfileEmail = () =>{
    console.log(profile.email)
    return profile.email
  }
  const checkAdmin = () =>{
    //email sql
    if(profile.email === "imgayhaveverbigk@gmail.com" ){
      return true
    }else{
      return false
    }
  }
  return (
    <div>
      <h2>React Google Login</h2>
      <br /><br />
      
      {/* //profile.emailสามารถใช้ไรเทียบแทนได้  ดึงข้อมูลทำหลังการ login*/}
      
      {profile ? (
        checkAdmin() ? (
          <div>
            <img src={profile.imageUrl} alt='user image'/>
            <h3>admin Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <br />
            <br />
            {/* ลิงค์หน้าHomeUser */}
            <Link to="/HomeAdmin" className="item">Welcome admin</Link>
            {/* ปุ่มlogout */}
            <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut}/>
          </div>
          ) : (
            <div>
              <img src={profile.imageUrl} alt='user image'/>
              <h3>userLogged in</h3>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <br />
              <br />
              {/* ลิงค์หน้าHomeUser */}
              <Link to="/HomeUser" className="item">Welcome user</Link>

              {/* ปุ่มlogout */}
              <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut}/>
            </div>
          )
        ) : (
        // กรณีไม่มี email นี้ใน ฐานข้อมูล
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSucess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        )
      }
    </div>
  ) 
}

export default Login;