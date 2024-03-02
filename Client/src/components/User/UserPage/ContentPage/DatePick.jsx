import { Button, Select } from "antd";
import React, { useState,useEffect } from 'react';


import "./DatePick.css";

function DatePick() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);


  const dayChange = (value) => {
    setSelectedDay(value);
  };
  const timeChange = (value) => {
    setSelectedTime(value);
  };
 
  function sendDataToServer(selectedDay, selectedTime) {
    const data = { selectedDay, selectedTime };
  
    fetch('http://localhost:3001/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  }
  

  return (
    <div className="select-date">
      <Select
        style={{ width: "200px" }}
        placeholder="เลือกวัน"
        value={selectedDay} // แก้เป็น selectedDay แทน setSelectedDay
        onChange={dayChange}
        options={[
          {
            value: "monday",
            label: "วันจันทร์",
          },
          {
            value: "tuesday",
            label: "วันอังคาร",
          },
          {
            value: "wednesday",
            label: "วันพุธ",
          },
          {
            value: "thursday",
            label: "วันพฤหัสบดี",
          },
          {
            value: "friday",
            label: "วันศุกร์",
          },
          {
            value: "saturday",
            label: "วันเสาร์",
          },
          {
            value: "sunday",
            label: "วันอาทิตย์",
          },
        ]}
      />


      <Select
        style={{ width: "200px" }}
        placeholder="เลือกเวลา"
        value={selectedTime}
        onChange={timeChange}
        options={[
          {
            value: "8:00 - 11:00",
            label: "8:00 - 11:00",
          },
          {
            value: "8:30 - 11:30",
            label: "8:30 - 11:30",
          },
          {
            value: "9:00 - 12:00",
            label: "9:00 - 12:00",
          },
          {
            value: "13:00 - 16:00",
            label: "13:00 - 16:00",
          },
          {
            value: "16:30 - 19:30",
            label: "16:30 - 19:30",
          },
        ]}
      />
      <Button type="defult" className="button-add"> + </Button>
      <Button type="defult" className="submit-button" onClick={() => sendDataToServer(selectedDay, selectedTime)}>ยืนยัน</Button>
    </div>
  );
}

export default DatePick;
