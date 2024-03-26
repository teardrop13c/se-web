import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import { Button, Modal, Select ,Table } from 'antd';
import "./Schedule.css";
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";

function Schedule() {

  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAvailability, setUserAvailability] = useState([]);
  const [user_reg, setUser_reg] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newData, setNewData] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/schedule/users/admins');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data.every(user => user.hasOwnProperty('user_email') && user.hasOwnProperty('user_name'))) {
          setInstructors(data);
          setOptions(data.map(user => ({
            value: user.user_email,
            label: user.user_name,
          })));
        } else {
          console.error('Data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    if (selectedUser !== null) {
      const fetchUserAvailability = async () => {
        try {
          const response = await fetch(`http://localhost:3001/schedule/useravailability`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserAvailability(data);
        } catch (error) {
          console.error('Error fetching user availability:', error);
        }
      };
  
      const fetchUserReg = async () => {
        try {
          const response = await fetch(`http://localhost:3001/schedule/user_reg`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser_reg(data);
        } catch (error) {
          console.error('Error fetching user registration:', error);
        }
      };

      fetchUserAvailability();
      fetchUserReg();
    }
  
    fetchUsers();
  }, [selectedUser]); // รวม dependencies เข้าด้วยกันในอาร์เรย์เดียว

  // Auth
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  if (!isLoggedIn || (profile?.name !== 'Admin007')) {
    return <Login />;
  }


  const showModal = () => {
    setIsModalVisible(true);
    setSelectedSubject(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedRoom(null);
  };

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };
  

  const handleOk = () => {
    const selectedInstructor = instructors.find(instructor => instructor.user_email === selectedUser);
    const newDataItem = {
      subject: selectedSubject,
      day: selectedDay,
      time: selectedTime,
      room: selectedRoom,
      instructor: selectedInstructor?.user_name || '',
    };
    setNewData([...newData, newDataItem]);
    setIsModalVisible(false);
    setSelectedSubject(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedRoom(null);
  };

  const columns = [
    {
      title: 'วัน',
    dataIndex: 'day',
    key: 'day',
    sorter: (a, b) => {
      // เรียงลำดับตามวัน
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayAIndex = days.indexOf(a.day.toLowerCase());
      const dayBIndex = days.indexOf(b.day.toLowerCase());
      if (dayAIndex !== dayBIndex) {
        return dayAIndex - dayBIndex; // เรียงตามวันก่อน
      } else {
        // ถ้าวันเท่ากัน ให้เรียงตามเวลา
        const timeA = a.time.split(' - ')[0];
        const timeB = b.time.split(' - ')[0];
        return new Date('1970/01/01 ' + timeA) - new Date('1970/01/01 ' + timeB);
      }
    },
    },
    {
      title: 'เวลา',
    dataIndex: 'time',
    key: 'time',
    },
    {
      title: 'วิชา',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'ห้อง',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'ผู้สอน',
      dataIndex: 'instructor',
      key: 'instructor',
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSubject(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setSelectedRoom(null);
  };
  
  

  return (
    <section id="main-layout">
      <Navbar />
      <AdminMenu />
      <div className="content">
        <h1>Content Schedule Page</h1>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={handleUserChange}
          options={options}
          style={{ width: '12%' }}
          filterOption={(input, option) =>
            option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
        <Button type="primary" onClick={showModal}>เพิ่มวิชาที่เปิดสอน</Button>
        <Modal title="เพิ่มวิชาที่เปิดสอน" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <form>
          <label htmlFor="subjectReg_id">วิชาที่เปิดสอน:</label>
          <Select id="subjectReg_id" style={{ width: '100%' }} onChange={value => setSelectedSubject(value)}>
          {user_reg
          .filter(subject => subject.user_email === selectedUser)
          .map((subject) => (
            <Select.Option key={`${subject.reg_id} - ${subject.subjectReg_id}`} value={subject.subjectReg_id}>
              {`${subject.reg_id} - ${subject.subjectReg_id}`}
            </Select.Option>
          ))}
        </Select>
          <br />
          <label htmlFor="day">วัน:</label>
          <Select id="day" style={{ width: '100%' }} onChange={value => setSelectedDay(value)}>
            <Select.Option value="monday">จันทร์</Select.Option>
            <Select.Option value="tuesday">อังคาร</Select.Option>
            <Select.Option value="wednesday">พุธ</Select.Option>
            <Select.Option value="thursday">พฤหัสบดี</Select.Option>
            <Select.Option value="friday">ศุกร์</Select.Option>
            <Select.Option value="saturday">เสาร์</Select.Option>
            <Select.Option value="sunday">อาทิตย์</Select.Option>
          </Select>
          <br />
          <label htmlFor="time">เวลา:</label>
          <Select id="time" style={{ width: '100%' }} onChange={value => setSelectedTime(value)}>
            <Select.Option value="9:00 - 12:00">9.00 - 12.00</Select.Option>
            <Select.Option value="13:00 - 16:00">13.00 - 16.00</Select.Option>
            <Select.Option value="16:00 - 19:00">16.00 - 19.00</Select.Option>
            <Select.Option value="16:30 - 19:30">16.30 - 19.30</Select.Option>
          </Select>
          <br />
          <label htmlFor="room">ห้องเรียน:</label>
          <Select id="room" style={{ width: '100%' }} onChange={value => setSelectedRoom(value)}>
            <Select.Option value="c201">C201</Select.Option>
            <Select.Option value="c202">C202</Select.Option>
            {/* Add more options here */}
          </Select>
      </form>
      </Modal>

        <h1>เวลาว่าง</h1>
        <ul>
          {userAvailability
            .filter(availItem => availItem.user_email === selectedUser)
            .sort((a, b) => {
              // เรียงลำดับตามวัน
              const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
              const dayComparison = days.indexOf(a.day.toLowerCase()) - days.indexOf(b.day.toLowerCase());
              // เรียงลำดับตามเวลา
              if (dayComparison === 0) {
                // เปรียบเทียบเวลาในรูปแบบ HH:MM
                const timeA = a.time_start_end.split(':').map(part => parseInt(part, 10));
                const timeB = b.time_start_end.split(':').map(part => parseInt(part, 10));
                if (timeA[0] !== timeB[0]) {
                  return timeA[0] - timeB[0]; // เรียงลำดับตามชั่วโมง
                } else {
                  return timeA[1] - timeB[1]; // เรียงลำดับตามนาที
                }
              }
              return dayComparison;
            })
            .map((availItem, index) => (
              <li key={`avail-${index}`}>
                <p>{availItem.day} {availItem.time_start_end}</p>
              </li>
            ))}
        </ul>
        <h1>วิชาที่เปิดสอน</h1>
        <ul>
        {user_reg
          .filter(item => item.user_email === selectedUser)
          .map((item, index) => (
            <li key={`reg-${index}`}>
              <p>วิชาที่เปิดสอน : {item.subjectReg_id}</p>
              <p>Lec : {item.lec_num}</p>
              <p>Lab : {item.lab_num}</p>
              <p>สาขา : {item.major_year}</p>
              <p>ห้อง : {item.roomReg_ranking}</p>
              <p>ชั้นปี : {item.student_year}</p>
            </li>
          ))}
        </ul>
        <h1>ตารางเรียน</h1>
        <Table
        dataSource={newData}
        columns={columns}
        pagination={false} // ปิด pagination หากไม่ต้องการให้แสดงหน้าที่ข้อมูล
        />
      </div>
    </section>
  );
}

export default Schedule;
