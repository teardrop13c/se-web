import React, { useState } from "react";
import Navbar from "../../Navbar"
import UserMenu from "../UserMenu/UserMenu"
import { useSelector } from 'react-redux'; 
import "./UserSchedule.css"
import Login from "../../Login/Login";

const UserSchedule = () => {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div>
        <table className="my-table"> {/* ถ้าใส่cssแล้วลบ border=1 ออก */}
          <thead>
            <tr>
              <th></th>
              <th>8.00</th>
              <th>9.00</th>
              <th>10.00</th>
              <th>11.00</th>
              <th>12.00</th>
              <th>13.00</th>
              <th>14.00</th>
              <th>15.00</th>
              <th>16.00</th>
              <th>17.00</th>
              <th>18.00</th>
              <th>19.00</th>
              <th>20.00</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Mon</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Tues</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Wed</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Thu</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Fri</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Sat</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>Sun</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default UserSchedule