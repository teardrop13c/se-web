import React, { useEffect, useState } from 'react';
import { Button, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './DatePick.css';
import '../UserSchedule.css';

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

  function sendDataToServer(timeArray) {
    if (!Array.isArray(timeArray) || timeArray.length === 0) {
      message.error('Error sending data: Empty or invalid time array');
      return;
    }
    console.log('Data to be sent:', { timeArray: timeArray });
    fetch('http://localhost:3001/api/timeData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timeArray: timeArray })
    })
    message.success("sucessfully");
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
    const newTimeData = { day: selectedDay, time: selectedTime ,email: profile.email };

    if (!newTimeData.email || !newTimeData.day || !newTimeData.time) {
      console.error('Error adding time data: Invalid time data structure');
      return;
    }
  
    const dayIndex = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'].indexOf(newTimeData.day);
    
    const timeRange = selectedTime.split(' - ');
    const startTime = timeRange[0];
    const endTime = timeRange[1];
  
    const startHour = parseInt(startTime.split(':')[0]);
    const startMinute = parseInt(startTime.split(':')[1]);
    const endHour = parseInt(endTime.split(':')[0]);
    const endMinute = parseInt(endTime.split(':')[1]);
  
    const timeDataArray = [];
  
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = (hour === startHour ? startMinute : 0); minute <= (hour === endHour ? endMinute : 30); minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute === 0 ? '00' : `${minute}`;
        const formattedTime = `${formattedHour}:${formattedMinute} - ${formattedHour + (minute === 30 ? 1 : 0)}:${formattedMinute}`;
  
        const timeIndex = Math.floor(formattedHour) - 8;
        const timeOffset = formattedTime.includes('30') ? 0.5 : 0;
  
        if (dayIndex !== -1 && timeIndex >= 0 && timeIndex < 12) {
          const cell = document.querySelector(`.my-table tbody tr:nth-child(${dayIndex + 1}) td:nth-child(${timeIndex * 2 + 2 + timeOffset * 2})`);
          cell.style.backgroundColor = getBackgroundColor(newTimeData.day);
          cell.style.color = '#fff';
        }
      }
    }
  
    const emptyIndex = newTimeArray.findIndex((subArray) => subArray.length === 0);
  
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

  function getBackgroundColor(day) {
    switch (day) {
      case 'mon':
        return '#FBDD3F';
      case 'tues':
        return '#E372FF';
      case 'wed':
        return '#82FF87';
      case 'thu':
        return '#FF9C64';
      case 'fri':
        return '#27CBFF';
      case 'sat':
        return '#9C4EFF';
      case 'sun':
        return '#FF0000';
      default:
        return '';
    }
  }

  return (
    <div>
      <div className="select-date">
        <Select
          style={{ width: '200px' }}
          placeholder="เลือกวัน"
          value={selectedDay}
          onChange={dayChange}
          options={[
            { value: 'mon', label: 'วันจันทร์' },
            { value: 'tues', label: 'วันอังคาร' },
            { value: 'wed', label: 'วันพุธ' },
            { value: 'thu', label: 'วันพฤหัสบดี' },
            { value: 'fri', label: 'วันศุกร์' },
            { value: 'sat', label: 'วันเสาร์' },
            { value: 'sun', label: 'วันอาทิตย์' },
          ]}
        />

        <Select
          style={{ width: '200px' }}
          placeholder="เลือกเวลา"
          value={selectedTime}
          onChange={timeChange}
          options={[
            { value: '8:00 - 11:00', label: '8:00 - 11:00' },
            { value: '8:30 - 11:30', label: '8:30 - 11:30' },
            { value: '9:00 - 12:00', label: '9:00 - 12:00' },
            { value: '13:00 - 16:00', label: '13:00 - 16:00' },
            { value: '16:30 - 19:30', label: '16:30 - 19:30' },
          ]}
        />
        <Button type="default" className="button-add" onClick={() => setTimeData(selectedDay, selectedTime)}> + </Button>

        <Button type="default" className="submit-button" onClick={() => sendDataToServer(timeArray)}> ยืนยัน </Button>

      </div>
        <table className="my-table"> {/* ถ้าใส่cssแล้วลบ border=1 ออก */}
            <thead>
              <tr>
                <th></th>
                <th colSpan={2}>8.00-8.30</th>
                <th colSpan={2}>9.00-9.30</th>
                <th colSpan={2}>10.00-10.30</th>
                <th colSpan={2}>11.00-11.30</th>
                <th colSpan={2}>12.00-12.30</th>
                <th colSpan={2}>13.00-13.30</th>
                <th colSpan={2}>14.00-14.30</th>
                <th colSpan={2}>15.00-15.30</th>
                <th colSpan={2}>16.00-16.30</th>
                <th colSpan={2}>17.00-17.30</th>
                <th colSpan={2}>18.00-18.30</th>
                <th colSpan={2}>19.00-19.30</th>
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
              </tr>
            </tbody>
          </table>
    </div>
  );
}

export default DatePick;
