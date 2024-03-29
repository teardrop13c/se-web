import React, {useState} from 'react'
import { Button, Modal, Select ,Table, message } from 'antd';
import { useSelector } from 'react-redux';

function UserScheduleContent() {
  const [newData, setNewData] = useState([]);
  const profile = useSelector((state) => state.auth.profile);

  // ในส่วนของ fetchtable
  const fetchtable = async () => {
    try {
      const response = await fetch(`http://localhost:3001/schedule/user_complete`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.user_email === profile.email);

      setNewData(filteredData);
  
    } catch (error) {
      console.error('Error fetching user registration:', error);
    }
  };
  

  fetchtable();

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
  return (
    <div>
      <h2>ตารางสอน {profile.name}</h2> 
      <Table
        dataSource={newData}
        columns={columns}
        pagination={false}
      />     
    </div>
  )
}

export default UserScheduleContent