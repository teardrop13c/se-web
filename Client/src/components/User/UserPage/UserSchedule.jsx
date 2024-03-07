import React, { useState } from "react";
import Navbar from "../../Navbar"
import UserMenu from "../UserMenu/UserMenu"
import "./UserSchedule.css"
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";

const MyTable = () => {
  //authuser
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  if (!isLoggedIn) {
    return <Login />;
  }

  const [selectedDay, setSelectedDay] = useState("เลือกวัน");
  const [selectedTime, setSelectedTime] = useState("เลือกเวลา");
  const days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["8.00", "9.00", "10.00", "11.00", "12.00", "13.00"
    , "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"];
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleAdd = () => {
    // ตรวจสอบว่าวันและเวลาได้ถูกเลือกแล้วหรือไม่
    if (selectedDay !== "เลือกวัน" && selectedTime !== "เลือกเวลา") {
      // หาตำแหน่งของวันและเวลาที่เลือกในอาร์เรย์
      const dayIndex = days.indexOf(selectedDay);
      const timeIndex = times.indexOf(selectedTime);
      // ถ้าหากตำแหน่งของวันและเวลาที่เลือกในอาร์เรย์ถูกพบ
      if (dayIndex !== -1 && timeIndex !== -1) {
        // อัพเดทข้อมูลในตาราง
        const table = document.querySelector('.my-table');
        if (table) {
          // เรียกใช้งานเซลที่ต้องการอัพเดท
          const row = table.rows[dayIndex + 1]; // เพิ่ม 1 เนื่องจากแถวแรกใช้สำหรับหัวตาราง
          const cell = row.cells[timeIndex + 1]; // เพิ่ม 1 เนื่องจากเซลแรกใช้สำหรับชื่อวัน
          cell.textContent = "Selected"; // สามารถกำหนดเนื้อหาในเซลได้ตามต้องการ
        }
      } else {
        console.log("ไม่พบวันหรือเวลาที่เลือกในตาราง");
      }
    } else {
      console.log("โปรดเลือกวันและเวลา");
    }
  };
  const handleClear = () => {
    // ตรวจสอบว่ามีวันและเวลาที่ถูกเลือกหรือไม่
    if (selectedDay !== "เลือกวัน" && selectedTime !== "เลือกเวลา") {
      // หาตำแหน่งของวันและเวลาที่เลือกในอาร์เรย์
      const dayIndex = days.indexOf(selectedDay);
      const timeIndex = times.indexOf(selectedTime);

      // ถ้าหากตำแหน่งของวันและเวลาที่เลือกในอาร์เรย์ถูกพบ
      if (dayIndex !== -1 && timeIndex !== -1) {
        // อัพเดทข้อมูลในตาราง
        const table = document.querySelector('.my-table');
        if (table) {
          // เรียกใช้งานเซลที่ต้องการอัพเดท
          const row = table.rows[dayIndex + 1]; // เพิ่ม 1 เนื่องจากแถวแรกใช้สำหรับหัวตาราง
          const cell = row.cells[timeIndex + 1]; // เพิ่ม 1 เนื่องจากเซลแรกใช้สำหรับชื่อวัน
          cell.textContent = ""; // เคลียร์เนื้อหาในเซล
        }

        // เคลียร์การเลือก
        setSelectedDay("เลือกวัน");
        setSelectedTime("เลือกเวลา");
      } else {
        console.log("ไม่พบวันหรือเวลาที่เลือกในตาราง");
      }
    } else {
      console.log("โปรดเลือกวันและเวลา");
    }
  };
  const handleConfirm = () => {
    // แสดงหน้าต่าง confirm และรอการยืนยันจากผู้ใช้
    const confirmed = window.confirm("คุณต้องการดำเนินการต่อหรือไม่?");

    // ตรวจสอบว่าผู้ใช้ได้กด "ตกลง" หรือ "ยกเลิก" บนหน้าต่าง confirm
    if (confirmed) {
      // ถ้าผู้ใช้กด "ตกลง" ทำสิ่งที่คุณต้องการทำต่อ
      console.log("ผู้ใช้กดตกลง");
      // เพิ่มโค้ดการดำเนินการต่อที่นี่
    } else {
      // ถ้าผู้ใช้กด "ยกเลิก" ไม่ต้องทำอะไร
      console.log("ผู้ใช้กดยกเลิก");
    }
  };

const UserSchedule = () => {
  return (
    <section id="main-layout">
      <Navbar />
      <UserMenu />
      <div>
      <table className="my-table"> {/* ถ้าใส่cssแล้วลบ border=1 ออก */}
            <thead>
              <tr>
                <th></th>
                <th colSpan={2}>8.00</th>
                <th colSpan={2}>9.00</th>
                <th colSpan={2}>10.00</th>
                <th colSpan={2}>11.00</th>
                <th colSpan={2}>12.00</th>
                <th colSpan={2}>13.00</th>
                <th colSpan={2}>14.00</th>
                <th colSpan={2}>15.00</th>
                <th colSpan={2}>16.00</th>
                <th colSpan={2}>17.00</th>
                <th colSpan={2}>18.00</th>
                <th colSpan={2}>19.00</th>
                <th colSpan={2}>20.00</th>
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