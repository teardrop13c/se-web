import React, { useState, useEffect } from 'react';
import Navbar from "../../Navbar";
import AdminMenu from "../AdminMenu/AdminMenu";
import { Button, Modal, Select ,Table, message } from 'antd';
import "./Schedule.css";
import { useSelector } from 'react-redux'; 
import Login from "../../Login/Login";
import * as XLSX from 'xlsx';

function Schedule() {

  const [options, setOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAvailability, setUserAvailability] = useState([]);
  const [user_reg, setUser_reg] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("-");
  const [selectedLectureSection, setSelectedLectureSection] = useState(" - ");
  const [selectedPracticeSection, setSelectedPracticeSection] = useState(" - ");
  const [newData, setNewData] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [course, setCoures] = useState([]);

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

    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoures(data);
      } catch (error) {
        console.error('Error fetching user registration:', error);
      }
    };

    fetchCourse();

    // ในส่วนของ fetchtable
    const fetchtable = async () => {
      try {
        const response = await fetch(`http://localhost:3001/schedule/user_complete`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewData(data);
    
      } catch (error) {
        console.error('Error fetching user registration:', error);
      }
    };
    

    fetchtable();
  
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
  }, [selectedUser,newData]); // รวม dependencies เข้าด้วยกันในอาร์เรย์เดียว

  // Auth
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  if (!isLoggedIn || (profile?.name !== 'Admin007')) {
    return <Login />;
  }


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };
  
  const handleOk = async () => {
    // ตรวจสอบว่ามีข้อมูลที่เลือกที่ซ้ำกันในตารางหรือไม่
    const isDuplicate = newData.some(dataItem => 
      dataItem.day === selectedDay &&
      dataItem.time_start_end === selectedTime &&
      dataItem.room_id === selectedRoom
    );
  
    // ถ้ามีข้อมูลที่ซ้ำกันในตาราง
    if (isDuplicate) {
      // แสดงข้อความแจ้งเตือน
      message.error('ไม่สามารถลงทะเบียนได้ เนื่องจากข้อมูลวัน เวลา และห้องเรียนที่เลือกซ้ำกับข้อมูลในตาราง');
      return; // หยุดการทำงานของฟังก์ชัน
    }
  
    // ถ้าไม่มีข้อมูลที่ซ้ำกันในตาราง
    // ดำเนินการต่อไปเพื่อส่งข้อมูล
  
    const selectedInstructor = instructors.find(
      (instructor) => instructor.user_email === selectedUser
    );
    const selectedRegistration = user_reg.find(
      (registration) => registration.subjectReg_id === selectedSubject
    );
    
    if (!selectedRegistration) {
      console.error("No registration found for selected user.");
      return;
    }    
    const { major_year, student_year } = selectedRegistration;
  
    const selectedSubjectID = selectedSubject
      ? selectedSubject.substring(0, 11)
      : null;
    const selectedCourse = selectedSubject
      ? course.find((course) => course.subject_ID.startsWith(selectedSubjectID))
      : null;
  
    const credite = selectedCourse ? selectedCourse.credite : "";
    const typeSubject = selectedCourse ? selectedCourse.typeSubject : "";
  
    const newDataItem = {
      subjectReg_id: selectedSubject,
      credite: credite,
      lec_group: selectedLectureSection,
      lab_group: selectedPracticeSection,
      major_year: major_year,
      student_year: student_year,
      day: selectedDay,
      time_start_end: selectedTime,
      room_id: selectedRoom,
      typeSubject: typeSubject,
      user_name: selectedInstructor?.user_name || "",
      user_email: selectedInstructor?.user_email || ""
    };
  
    try {
      const response = await fetch("http://localhost:3001/schedule/newdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDataItem),
      });
  
      if (!response.ok) {
        throw new Error("Error sending data: " + response.statusText);
      }
  
      console.log("Data has been sent successfully!");
    } catch (error) {
      console.error("Error:", error.message);
    }
  
    // ปิด Modal เมื่อทำงานเสร็จสิ้น
    setIsModalVisible(false);
  };
  

  const columns = [
    {
      title: 'วัน',
      dataIndex: 'day', // ระบุ dataIndex เพื่อให้ sorter function ทำงานได้ถูกต้อง
      key: 'day',
      sorter: (a, b) => {
        // เรียงลำดับตามวัน
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayAIndex = days.indexOf((a.day || '').toLowerCase());
        const dayBIndex = days.indexOf((b.day || '').toLowerCase());
        if (dayAIndex !== dayBIndex) {
          return dayAIndex - dayBIndex; // เรียงตามวันก่อน
        } else {
          // ถ้าวันเท่ากัน ให้เรียงตามเวลา
          const timeA = (a.time_start_end || '').split(' - ')[0];
          const timeB = (b.time_start_end || '').split(' - ')[0];
          return new Date('1970/01/01 ' + timeA) - new Date('1970/01/01 ' + timeB);
        }
      },
    },
    {
      title: 'เวลา',
      dataIndex: 'time_start_end',
      key: 'time_start_end',
    },
    {
      title: 'วิชา',
      dataIndex: 'subjectReg_id',
      key: 'subjectReg_id',
    },
    {
      title: 'ห้อง',
      dataIndex: 'room_id',
      key: 'room_id',
    },
    {
      title: 'หมู่บรรยาย',
      dataIndex: 'lec_group',
      key: 'lec_group',
    },
    {
      title: 'หมู่ปฏิบัติ',
      dataIndex: 'lab_group',
      key: 'lab_group',
    },
    {
      title: 'ผู้สอน',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'สาขา',
      dataIndex: 'major_year',
      key: 'major_year',
    },
    {
      title: 'ชั้นปี',
      dataIndex: 'student_year',
      key: 'student_year',
    },
    {
      title: 'หน่วยกิจ',
      dataIndex: 'credite',
      key: 'credite',
    },
    {
      title: 'หมวดหมู่วิชา',
      dataIndex: 'typeSubject',
      key: 'typeSubject',
    }
  ];      

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exportToXlsx = () => {
    const exportData = newData.map(item => ({
      'id':item.user_complete_id,
      'วัน': item.day,
      'เวลา': item.time_start_end,
      'วิชา': item.subjectReg_id,
      'ห้อง': item.room_id,
      'หมู่บรรยาย': item.lec_group,
      'หมู่ปฏิบัติ': item.lab_group,
      'ผู้สอน': item.user_name,
      'สาขา': item.major_year,
      'ชั้นปี': item.student_year,
      'หน่วยกิจ': item.credite,
      'หมวดหมู่วิชา': item.typeSubject,
    }));
    console.log(exportData);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ตารางเรียน');

    // บันทึกไฟล์
    XLSX.writeFile(wb, 'ตารางเรียน.xlsx');
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
          <Select id="subjectReg_id" style={{ width: '100%' }} onChange={value => setSelectedSubject(value)} placeholder="Select a subject">
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
          <Select id="day" style={{ width: '100%' }} onChange={value => setSelectedDay(value)} placeholder="Select a day">
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
          <Select id="time" style={{ width: '100%' }} onChange={value => setSelectedTime(value)} placeholder="Select a time">
            <Select.Option value="9:00 - 12:00">9.00 - 12.00</Select.Option>
            <Select.Option value="13:00 - 16:00">13.00 - 16.00</Select.Option>
            <Select.Option value="16:00 - 19:00">16.00 - 19.00</Select.Option>
            <Select.Option value="16:30 - 19:30">16.30 - 19.30</Select.Option>
          </Select>
          <br />
          <label htmlFor="lectureSection">หมู่บรรยาย:</label>
          <Select id="lectureSection" style={{ width: '100%' }} onChange={value => setSelectedLectureSection(value)} placeholder="-">
            <Select.Option value="-">-</Select.Option>
            <Select.Option value="800">800</Select.Option>
            <Select.Option value="801">801</Select.Option>
            {/* เพิ่มตัวเลือกอื่น ๆ ตามต้องการ */}
          </Select>
          <br />
          <label htmlFor="practiceSection">หมู่ปฏิบัติ:</label>
          <Select id="practiceSection" style={{ width: '100%' }} placeholder="-" onChange={value => {
              setSelectedPracticeSection(value);
              // ตรวจสอบว่าหมู่ปฏิบัติถูกเลือกหรือไม่
              if (value !== '-') {
                  // ถ้าหมู่ปฏิบัติถูกเลือก ให้เปิดให้ผู้ใช้เลือกห้อง
                  document.getElementById('room').removeAttribute('disabled');
              } else {
                  // ถ้าหมู่ปฏิบัติไม่ถูกเลือก ให้ปิดการเลือกห้อง
                  document.getElementById('room').setAttribute('disabled', 'disabled');
              }
          }}>
            <Select.Option value="-">-</Select.Option>
            <Select.Option value="830">830</Select.Option>
            <Select.Option value="831">831</Select.Option>
            {/* เพิ่มตัวเลือกอื่น ๆ ตามต้องการ */}
          </Select>
          <label htmlFor="room">ห้องเรียน:</label>
          <Select id="room" style={{ width: '100%' }} placeholder="-" disabled={selectedPracticeSection === '-' ? 'disabled' : ''} onChange={value => setSelectedRoom(value)}>
          <Select.Option value="-">-</Select.Option>
            <Select.Option value="c201">C201</Select.Option>
            <Select.Option value="c202">C202</Select.Option>
            {/* เพิ่มตัวเลือกอื่น ๆ ตามต้องการ */}
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
              <p>Lec : {item.lec_group}</p>
              <p>Lab : {item.lab_group}</p>
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
          pagination={false}
        />
        <Button type="primary" onClick={exportToXlsx}>ส่งออกเป็น Excel</Button>
      </div>
    </section>
  );
}

export default Schedule;
