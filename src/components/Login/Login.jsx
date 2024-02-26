import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import "./Login.css";


function Login() {
  const clientId = "547931595657-oaphvpiui1527babqslkcbb93a9p938o.apps.googleusercontent.com";
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    setIsLoggedIn(true);
    setProfile(res.profileObj);
    setShowPhoneNumberModal(true);
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setProfile(null);
  };

  const checkAdmin = () => {
    if (profile && profile.email === "imgayhaveverbigk@gmail.com") {
      return true;
    } else {
      return false;
    }
  };

  const savePhoneNumber = () => {
    // รอเก็บเบอร์เข้า data base
    console.log("Phone Number saved:", userPhoneNumber);
  
    setShowPhoneNumberModal(false);
    // ถ้ามีเบอร์ใน data base แล้วให้ navigate ไปยังหน้าของ User/Admin
    // navigate("/HomeUser"); 
  };

  const openPhoneNumberModal = () => {
    setShowPhoneNumberModal(true);
  };

  const closePhoneNumberModal = () => {
    setShowPhoneNumberModal(false);
  };

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

  function accountUser() {
    console.log("LoginUser : ", isLoggedIn);
    return (
      <div className="user-info-container">
        <img src={profile.imageUrl} alt="user image" className="user-image" />
        <div className="user-details">
          <h3>userLogged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone Number: {userPhoneNumber}</p>
        </div>
        <Link to="/HomeUser" className="welcome-button">
          Welcome user
        </Link>
        <span className="logout-button">
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </span>
      </div>
    );
  }

  function LoginPage() {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="incontainer">
        <img
          src="https://edureq.src.ku.ac.th/image/KU_SRC_Color_bg_white.jpg"
          alt="KU Logo"
          style={{ width: "180px", height: "180px" }}
        />
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

        {showPhoneNumberModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>กรุณากรอกเบอร์โทรศัพท์</h2>
              <input
                type="text"
                placeholder="Phone Number"
                value={userPhoneNumber}
                onChange={(e) => setUserPhoneNumber(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={savePhoneNumber}>Save</button>
                <button onClick={closePhoneNumberModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
