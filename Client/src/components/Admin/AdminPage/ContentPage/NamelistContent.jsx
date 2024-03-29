import React, { useState, useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCalendarDays, faCommentDots, faTrash } from '@fortawesome/free-solid-svg-icons';
import "./NamelistContent.css";
import Axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Table, Input, Form } from 'antd';
import Swal from 'sweetalert2';


// New component for the dividing line
const Divider = () => (
  <div className="namelist-divider"></div>
);

function NamelistContent() {
  const [userList, setUserList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api2/profile')
      .then(response => response.json())
      .then(data => {
        setUserList(data);
        setTableData(data); // ตั้งค่า tableData ที่นี่
      })
      .catch(error => console.error('Error fetching user:', error));
  }, [userList]);

  const columns = [
    { title: 'ชื่อ', dataIndex: 'user_name', key: 'user_name' },
    { title: 'อีเมลล์', dataIndex: 'user_email', key: 'user_email' },
    { title: 'เบอร์โทร', dataIndex: 'user_phone', key: 'user_phone' },
    {
      title: 'จัดการ',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEditData(record)}>
            แก้ไข
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteData(record)}>
            ลบ
          </Button>
        </>
      ),
    },
  ];

  const handleEditData = (record) => {
    setFormData(record);
    form.setFieldsValue(record);
    setIsEditMode(true);
  };

  const handleFinish = (values) => {
    if (isEditMode) {
        handleUpdateData(values);
        setIsEditMode(false); // เพิ่มบรรทัดนี้เพื่อปิดโหมดแก้ไขหลังจากการบันทึก
    }
};

const handleUpdateData = (values) => {
  if (!tableData) {
      console.error('tableData is not defined');
      return;
  }
  
  const updatedData = tableData.map((data) =>
      data.user_email === formData.user_email ? { ...data, ...values } : data
  );
  setTableData(updatedData);

  // Update userList as well
  const updatedUserList = userList.map((user) =>
      user.user_email === formData.user_email ? { ...user, user_phone: values.เบอร์โทร } : user
  );
  setUserList(updatedUserList);

  Axios.put('http://localhost:3001/edit', { user_phone: values.เบอร์โทร, user_email: formData.user_email })
    .then(response => {
      console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'การแก้ไขข้อมูลเสร็จสมบูรณ์',
          text: 'ข้อมูลได้รับการแก้ไขเรียบร้อยแล้ว!',
        });
    })
    .catch(error => {
      console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาดในการแก้ไขข้อมูล',
          text: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล โปรดลองอีกครั้ง!',
        });
    });
  form.resetFields();
};

  const handleDeleteData = (record) => {
    Axios.delete('http://localhost:3001/delete:user_email', { data: { user_email: record.user_email, user_name: record.user_name }})
      .then(response => {
        console.log(response.data);
        // Update frontend state after successful deletion
        const updatedData = tableData.filter(item => item.user_email !== record.user_email);
        setTableData(updatedData);
  
        // Add import for Swal if not already imported
        Swal.fire({
          icon: 'success',
          title: 'การลบข้อมูลเสร็จสมบูรณ์',
          text: 'ข้อมูลได้รับการลบเรียบร้อยแล้ว!',
        });
          // Refetch data to update userList after deletion
        /*fetch('http://localhost:3001/api2/profile')
          .then(response => response.json())
          .then(data => {
            setUserList(data);
          })
          .catch(error => console.error('Error fetching user:', error));*/
      })
      .catch(error => {
        console.error(error);
        // Add import for Swal if not already imported
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาดในการลบข้อมูล',
          text: 'เกิดข้อผิดพลาดในการลบข้อมูล โปรดลองอีกครั้ง!',
        });
      });
  
    form.resetFields();
  };

  return (
    <div className="rounded-rectangle">
      <p className="faculty-text">รายชื่อ</p>
      <Divider />
      <div className="csv-table">
        <Table dataSource={userList} columns={columns} rowKey="user_email" />
      </div>
      {isEditMode && (
        <div className="data-form-popup">
          <Form form={form} onFinish={handleFinish}>
            <Form.Item label="เบอร์โทร" name="เบอร์โทร">
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              บันทึกการแก้ไข
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default NamelistContent;