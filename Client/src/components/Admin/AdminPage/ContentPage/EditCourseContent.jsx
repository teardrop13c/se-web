import React, { useEffect, useState } from "react";
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Upload, Table, Input, Form } from 'antd';
import axios from 'axios';
import Papa from 'papaparse';
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
              setTableData(result.data);
            },
            header: true,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
  };

  const columns = [
    { title: 'NO', dataIndex: 'ลำดับ', key: 'id_course' },
    { title: 'รหัสวิชา', dataIndex: 'รหัสวิชา', key: 'subject_ID' },
    { title: 'ชื่อวิชา', dataIndex: 'ชื่อวิชา', key: 'subjact_name' },
    { title: 'หน่วยกิจ', dataIndex: 'หน่วยกิจ', key: 'credite' },
    { title: 'ประเภทวิชา', dataIndex: 'ประเภทวิชา', key: 'typeSubject' },
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
    const updatedData = tableData.map((data) =>
      data.ลำดับ === formData.ลำดับ ? { ...data, ...values } : data
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

    axios.delete(`http://localhost:3001/delete/${record.รหัสวิชา}`)
        .then(response => {
            console.log(response.data);
            // Update frontend state after successful deletion
            const updatedData = tableData.filter(item => item.รหัสวิชา !== record.รหัสวิชา);
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


  return (
    <div className="rounded-rectangle">
      <div className="file-upload">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </div>

      <div className="csv-table">
        <Table dataSource={tableData} columns={columns} />
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