import { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import React from "react";
import { gapi } from "gapi-script";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import "./Login.css";

function Login() {
  //ตัวที่ขอใช้google
  const clientId = "547931595657-oaphvpiui1527babqslkcbb93a9p938o.apps.googleusercontent.com";

  //ต้องใช้nullไม่งั้นจะเกิดบัค
  const [profile, setProfile] = useState(null);

  //stateเช็คการlogin
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // การนำค่าgoogleมาใช้
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  },);


  //loginได้
  const onSucess = (res) => {
    setIsLoggedIn(true);
    setProfile(res.profileObj);
    console.log("sucess", res);
    console.log("loginStateOnsucess : ",isLoggedIn); //
  };

  //loginไม่ได้
  const onFailure = (res) => {
    console.log("failed", res);
  };

  //ทำให้ค่าreset setProfile
  const logOut = () => {
    setIsLoggedIn(false);
    setProfile(null);
  };

  // เช็คว่าเป็นadminไหม
  const checkAdmin = () => {
    //email sql
    if (profile && profile.email === "imgayhaveverbigk@gmail.com") {
      return true;
    } else {
      return false;
    }
  };

  //โยงไปหน้าaccountAdmin True
  function accountAdmin() {
    return (
      <div>
        <img src={profile.imageUrl} alt="user image" />
        <h3>admin Logged in</h3>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <br />
        <br />
        <Link to="/HomeAdmin" className="item">
          Welcome admin
        </Link>
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      </div>
    );

  }


  //โยงมาหน้าaccountUser Fasle
  function accountUser() {
    console.log("LoginUserState : ",isLoggedIn)
    console.log("UserEmail : ",profile.email)
    console.log("UserEName : ",profile.name)
    return (
      <div>
        <img src={profile.imageUrl} alt="user image" />
        <h3>userLogged in</h3>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <br />
        <br />
        <Link to="/HomeUser" className="item">
          Welcome user
        </Link>
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      </div>
    );
  }


  // กรณีไม่มี email นี้ใน ฐานข้อมูล and ถ้ายังไม่ล็อคอินต้องมาตรงนี้
  function LoginPage() {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSucess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    );

  }
  return (
    <div className="login-container">
      {/* //profile.emailสามารถใช้ไรเทียบแทนได้  ดึงข้อมูลทำหลังการ login*/}
      <div className="incontainer">
        <img
          src="https://edureq.src.ku.ac.th/image/KU_SRC_Color_bg_white.jpg"
          alt="KU Logo"
          style={{ width: "180px", height: "180px" }}
        />
        <h2>ยินดีต้อนรับสู่ระบบจัดตารางสอน</h2>
        <br />
        {isLoggedIn ? (
          checkAdmin() ? (
            accountAdmin()
          ) : (
            accountUser()
          )
        ) : (
          LoginPage()
        )}
      </div>
    </div>
  );
}

export default Login;
