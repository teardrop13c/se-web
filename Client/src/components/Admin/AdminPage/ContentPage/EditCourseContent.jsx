import React, { useEffect, useState } from "react";
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Upload, Table, Input, Form } from 'antd';
import axios from 'axios';
import "./EditCourseContent.css";
import Swal from 'sweetalert2';

function EditCourseContent() {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const props = {
    name: 'file',
    action: 'http://localhost:3001/uploads',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file && info.file.status !== 'uploading') {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          Papa.parse(info.file.originFileObj, {
            complete: (result) => {
              // setTableData(result.data);
            },
            header: true,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/course_show')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        setTableData(data); // ตั้งค่า tableData ที่นี่
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, [tableData, courses]);

  const columns = [
    { title: 'NO', dataIndex: 'id_course', key: 'id_course' },
    { title: 'รหัสวิชา', dataIndex: 'subject_ID', key: 'subject_ID' },
    { title: 'ชื่อวิชา', dataIndex: 'subject_name', key: 'subject_name' }, // เปลี่ยนตรงนี้
    { title: 'หน่วยกิจ', dataIndex: 'credite', key: 'credite' }, // เปลี่ยนตรงนี้
    { title: 'ประเภทวิชา', dataIndex: 'typeSubject', key: 'typeSubject' },
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
    } else {
      axios.post('http://localhost:3001/create', values)
        .then(response => {
          setTableData(prevData => [...prevData, response.data]);
          Swal.fire({
            icon: 'success',
            title: 'การเพิ่มข้อมูลเสร็จสมบูรณ์',
            text: 'ข้อมูลได้รับการเพิ่มเรียบร้อยแล้ว!',
          });
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาดในการเพิ่มข้อมูล',
            text: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล โปรดลองอีกครั้ง!',
          });
        });
      form.resetFields();
    }
    setIsEditMode(false);
  };

  const handleUpdateData = (values) => {
    if (!tableData) {
      console.error('tableData is not defined');
      return;
    }

    const updatedData = tableData.map((data) =>
      data.id_course === formData.id_course ? { ...data, ...values } : data
    );
    setTableData(updatedData);

    axios.put('http://localhost:3001/update', { ...formData, ...values })
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
    console.log('Deleting record:', record);

    axios.delete(`http://localhost:3001/delete/${record.subject_ID}`)
      .then(response => {
        console.log(response.data);
        // Update frontend state after successful deletion
        const updatedData = tableData.filter(item => item.subject_ID !== record.subject_ID);
        setTableData(updatedData);

        Swal.fire({
          icon: 'success',
          title: 'การลบข้อมูลเสร็จสมบูรณ์',
          text: 'ข้อมูลได้รับการลบเรียบร้อยแล้ว!',
        });
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาดในการลบข้อมูล',
          text: 'เกิดข้อผิดพลาดในการลบข้อมูล โปรดลองอีกครั้ง!',
        });
      });

    form.resetFields();
  };

  const handleDeleteAllData = () => {
    Swal.fire({
      icon: 'warning',
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบ!',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:3001/all', {
          method: 'DELETE'
        })
          .then(data => {
            console.log(data);
            setTableData([]);
            Swal.fire({
              icon: 'success',
              title: 'การลบข้อมูลทั้งหมดเสร็จสมบูรณ์',
              text: 'ข้อมูลทั้งหมดได้รับการลบเรียบร้อยแล้ว!',
            });
          })
          .catch(error => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'ข้อผิดพลาดในการลบข้อมูล',
              text: 'เกิดข้อผิดพลาดในการลบข้อมูล โปรดลองอีกครั้ง!',
            });
          });
      }
    });
  };

  return (
    <div className="rounded-rectangle">
      <div className="file-upload">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>

      <div className="action-buttons">
        <Button type="primary" danger onClick={handleDeleteAllData}>
          ลบข้อมูลทั้งหมด
        </Button>
      </div>

      <div className="csv-table">
        <Table dataSource={courses} columns={columns} rowKey="id_course" />
      </div>

      {isEditMode && (
        <div className="data-form-popup">
          <Form form={form} onFinish={handleFinish}>
            <Form.Item label="รหัสวิชา" name="รหัสวิชา">
              <Input />
            </Form.Item>
            <Form.Item label="ชื่อวิชา" name="ชื่อวิชา">
              <Input />
            </Form.Item>
            <Form.Item label="หน่วยกิจ" name="หน่วยกิจ">
              <Input />
            </Form.Item>
            <Form.Item label="ประเภทวิชา" name="ประเภทวิชา">
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

export default EditCourseContent;