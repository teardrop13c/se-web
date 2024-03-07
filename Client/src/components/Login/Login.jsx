import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "./Login.css";
import { whenLogin,whenLogout } from "../../../Store/authSlice";

function Login() {
  const clientId = "547931595657-oaphvpiui1527babqslkcbb93a9p938o.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
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
    dispatch(whenLogin(res.profileObj));
    setProfile(res.profileObj);
    setShowPhoneNumberModal(true);
  };

  const onFailure = (res) => {
    console.log("failed", res);
  };

  const logOut = () => {
    dispatch(whenLogout());
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
    if (!checkAdmin() && isLoggedIn) {
      setShowPhoneNumberModal(true);
    }
  };
  const closePhoneNumberModal = () => {
    setShowPhoneNumberModal(false);
  };

  const welcomeMessage = (
    <h2 className="welcome-message">ยินดีต้อนรับสู่ระบบจัดตารางสอน</h2>
  );

  useEffect(() => {
    const sendProfileName = async () => {
      try {
        // ตรวจสอบว่าโปรไฟล์ไม่ใช่ค่าว่าง และมีอีเมล
        if (profile && profile.email) {
          // ส่งคำขอ POST ไปยังเซิร์ฟเวอร์
          const response = await fetch('http://localhost:3001/api/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: profile.name, email: profile.email })
          });
  
          if (response.ok) {
            console.log('Profile name sent successfully');
          } else {
            throw new Error('Failed to send profile name');
          }
        } else {
          console.error('Profile is null or missing email');
        }
      } catch (error) {
        console.error('Error sending profile name:', error.message);
      }
    };
  
    sendProfileName();
  }, [profile]);
  

  function accountAdmin() {
    return (
      <div className="account-info-container">
        <img src={profile.imageUrl} alt="user image" className="admin-image" />
        <div className="admin-details">
          <p className="admin-details-text">Name: {profile.name}</p>
          <p className="admin-details-text">Email: {profile.email}</p>
        </div>
        <Link to="/HomeAdmin" className="welcome-button">
          Welcome admin
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

  function accountUser() {
    return (
      <div className="user-info-container">
        <img src={profile.imageUrl} alt="user image" className="user-image" />
        <div className="user-details">
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          {!checkAdmin() && (
            <>
              <p>Phone Number: {userPhoneNumber}</p>
              {!checkAdmin() && (
                showPhoneNumberModal && (
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
                )
              )}
            </>
          )}
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
    <div className="bg">
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

        {!checkAdmin() && showPhoneNumberModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="phone-instruction">กรุณากรอกเบอร์โทรศัพท์</h2>
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
    </div>
  );
}

export default Login;
