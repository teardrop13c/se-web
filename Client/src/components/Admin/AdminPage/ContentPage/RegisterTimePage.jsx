import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RegisterTimePage.css';
import th from 'date-fns/locale/th';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Col, Row } from 'antd';

const showErrorMessage = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error
  });
};
const hideErrorMessage = () => {
  const alertContainer = document.getElementById('alert-container');
  if (alertContainer) {
    alertContainer.classList.remove('show');
  }
};
function RegisterTimePage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [error, setError] = useState('');

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
    console.log('OPEN: ',openingTime);
    if (error) setError('');
  };

  const handleClosingTimeChange = (date) => {
    setClosingTime(date);
    console.log('CLOSE:',closingTime);
    if (error) setError('');
  };

  const handleOpeningImageClick = () => {
    openingDatePickerRef.current.setOpen(true);
  };

  const handleClosingImageClick = () => {
    closingDatePickerRef.current.setOpen(true);
  };

  // const handleConfirmButtonClick = () => {
  //   if (closingTime <= openingTime) {
  //     setError('เวลาปิดการลงทะเบียนต้องมาทีหลังเวลาเปิดการลงทะเบียน');
  //     showErrorMessage();
  //   } else {
  //     hideErrorMessage();
  //     console.log('open:',openingTime);
  //     console.log('close: ',closingTime);
  //     console.log('Registration confirmed!');
  //     // Proceed with registration logic
  //   }
  // };
  const handleConfirmButtonClick = async () => {
    if (closingTime <= openingTime) {
      setError('เวลาปิดการลงทะเบียนต้องมาทีหลังเวลาเปิดการลงทะเบียน');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      });
    }
    else {
      hideErrorMessage();
      console.log('open:', openingTime);
      console.log('close: ', closingTime);
      console.log('Registration confirmed!');
  
      try {
        const response = await fetch('http://localhost:3001/api/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ openingTime, closingTime })
        });
  
        if (response.ok) {
          console.log('Registration data sent successfully');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration data sent successfully'
          });
        } else {
          throw new Error('Failed to send registration data');
        }
      } catch (error) {
        console.error('Error sending registration data:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error sending registration data: ${error.message}`
        });
      }
    }
  };
  
//CRUD





  return (
    <div className="register-rounded-rectangle">
      <p className="converted-time">{convertToThaiTime(currentDateTime)}</p>
      <p className="registration-text">เลือกเวลาเปิด / ปิดการลงทะเบียน</p>
      <div className="date-picker-container">
      <Row gutter={16} style={{ flexDirection: "row" }}>
        <Col span={10}>
          <div className="open-datepicker-container">
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
        </div>
        </Col>
        <h2 className="to-text"> ถึง </h2>
        <Col span={10}>
          <div className="close-datepicker-container">
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
          </div>    
          </Col>
          <Col span={2}>
            <button className="confirm-button" onClick={handleConfirmButtonClick}> ยืนยัน </button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default RegisterTimePage;
