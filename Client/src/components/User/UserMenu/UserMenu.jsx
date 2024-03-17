import React from "react";
import { Link } from "react-router-dom";
import homeIcon from '../../../assets/home.png'
import datePick from '../../../assets/clock-regular.svg'
import registerIcon from '../../../assets/register.svg'

function UserMenu() {
  return (
    <section id="sidebar">
    <div className="sidebar">
        <Link to="/HomeUser" className="item">
          <div className="icon">
            <img
              src={homeIcon}
              alt="homeUser"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div className="text">HOME</div>
        </Link>
        <Link to="/UserSchedule" className="item">
          <div className="icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2063.png?alt=media&token=bfc8773c-b82c-47ab-8c54-2ef1078bcf0c"
              alt="schedule"
              style={{ width: "55px", height: "55px" }}
            />
          </div>
          <div className="text">SCHEDULE</div>
        </Link>
        <Link to="/UserDatePick" className="item">
          <div className="icon">
            <img
              src={datePick}
              alt="datepick"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div className="text">DATE PICK</div>
        </Link>
        <Link to="/UserRegister" className="item">
          <div className="icon">
            <img
              src={registerIcon}
              alt="register"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div className="text">REGISTER</div>
        </Link>
        <Link to="/UserNews" className="item">
          <div className="icon">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2075.png?alt=media&token=d58c0239-ee73-412a-bb96-2f62b3bf4e97"
              alt="news"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
          <div className="text">NEWS</div>
        </Link>
      </div> 
    </section>
  );
}

export default UserMenu;
