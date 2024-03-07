import React, { useEffect, useState } from 'react';
import { Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './DatePick.css';


function DatePick() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [timeArray, setTimeArray] = useState([]);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
 
  const dayChange = (value) => {
    setSelectedDay(value);
  };

  const timeChange = (value) => {
    setSelectedTime(value);
  };

  function sendDataToServer(newTimeArray) {
    if (!Array.isArray(newTimeArray) || newTimeArray.length === 0) {
      console.error('Error sending data: Empty or invalid time array');
      return;
    }

    console.log('Data to be sent:', { timeArray: newTimeArray });

    fetch('http://localhost:3001/api/timeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timeArray: newTimeArray })
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

  function setTimeData(selectedDay, selectedTime) {
    if (!selectedDay || !selectedTime) {
      console.error('Error adding time data: Invalid day or time');
      return;
    }

    if (!profile || !profile.name) {
      console.error('Error adding time data: Profile name is missing');
      return;
    }

    const newTimeArray = [...timeArray];
    const newTimeData = { day: selectedDay, time: selectedTime ,name: profile.name };

    if (!newTimeData.name || !newTimeData.day || !newTimeData.time) {
      console.error('Error adding time data: Invalid time data structure');
      return;
    }

    const emptyIndex = newTimeArray.findIndex(subArray => subArray.length === 0);

    if (emptyIndex !== -1) {
      newTimeArray[emptyIndex] = [newTimeData];
    } else {
      newTimeArray.push([newTimeData]);
    }

    console.log('New time array:', newTimeArray);

    setTimeArray(newTimeArray);
    setSelectedDay(null);
    setSelectedTime(null);
  }


  return (
    <div className="select-date">
      <Select
        style={{ width: "200px" }}
        placeholder="เลือกวัน"
        value={selectedDay}
        onChange={dayChange}
        options={[
          { value: "monday", label: "วันจันทร์" },
          { value: "tuesday", label: "วันอังคาร" },
          { value: "wednesday", label: "วันพุธ" },
          { value: "thursday", label: "วันพฤหัสบดี" },
          { value: "friday", label: "วันศุกร์" },
          { value: "saturday", label: "วันเสาร์" },
          { value: "sunday", label: "วันอาทิตย์" },
        ]}
      />

      <Select
        style={{ width: "200px" }}
        placeholder="เลือกเวลา"
        value={selectedTime}
        onChange={timeChange}
        options={[
          { value: "8:00 - 11:00", label: "8:00 - 11:00" },
          { value: "8:30 - 11:30", label: "8:30 - 11:30" },
          { value: "9:00 - 12:00", label: "9:00 - 12:00" },
          { value: "13:00 - 16:00", label: "13:00 - 16:00" },
          { value: "16:30 - 19:30", label: "16:30 - 19:30" },
        ]}
      />

      <Button type="default" className="button-add" onClick={() => setTimeData(selectedDay, selectedTime)}> + </Button>

      <Button type="default" className="submit-button" onClick={() => sendDataToServer(timeArray)}>ยืนยัน</Button>


    </div>
  );
}

export default DatePick;
