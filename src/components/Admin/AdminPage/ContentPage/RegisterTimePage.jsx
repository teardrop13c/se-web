import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RegisterTimePage.css';
import th from 'date-fns/locale/th';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck } from '@fortawesome/free-solid-svg-icons';

function RegisterTimePage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());

  const openingDatePickerRef = useRef(null);
  const closingDatePickerRef = useRef(null);

  const convertToThaiTime = (dateTime) => {
    const options = {
      timeZone: 'Asia/Bangkok',
      hour12: false,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    return dateTime.toLocaleString('th', options);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpeningTimeChange = (date) => {
    setOpeningTime(date);
  };

  const handleClosingTimeChange = (date) => {
    setClosingTime(date);
  };

  const handleOpeningImageClick = () => {
    openingDatePickerRef.current.setOpen(true);
  };

  const handleClosingImageClick = () => {
    closingDatePickerRef.current.setOpen(true);
  };

  const handleConfirmButtonClick = () => {
    
    console.log('Registration confirmed!');
  };

  return (
    <div className="register-rounded-rectangle">
      <p className="converted-time">{convertToThaiTime(currentDateTime)}</p>
      <p className="registration-text">เลือกเวลาเปิด / ปิดการลงทะเบียน</p>
      <div className="date-picker-container">
        <div className="datepicker-container">
          <DatePicker
            className="custom-datepicker-text"
            selected={openingTime}
            onChange={handleOpeningTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd MMMM yyyy HH:mm "
            locale={th}
            ref={openingDatePickerRef}
          />
          <div className="icon-container opening-time-icon-container" onClick={handleOpeningImageClick}>
            <FontAwesomeIcon icon={faClock} className="time-schedule-icon" />
          </div>
        </div>
        <span className="to-text"> ถึง </span>
        <div className="datepicker-container">
          <DatePicker
            className="custom-datepicker-text"
            selected={closingTime}
            onChange={handleClosingTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd MMMM yyyy HH:mm "
            locale={th}
            ref={closingDatePickerRef}
          />
          <div className="icon-container closing-time-icon-container" onClick={handleClosingImageClick}>
            <FontAwesomeIcon icon={faClock} className="time-schedule-icon" />
          </div>
        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirmButtonClick}>
        <FontAwesomeIcon icon={faCheck} className="confirm-icon" />
        ยืนยัน
      </button>
    </div>
  );
}

export default RegisterTimePage;
