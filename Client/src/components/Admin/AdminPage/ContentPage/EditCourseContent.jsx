import React, { useEffect, useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import "./EditCourseContent.css"

function EditCourseContent() {

  const props = {
    name: 'file',
    action: 'http://localhost:3001/uploads',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file && info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
  };


  return (
    <>
      <div className="rounded-rectangle">
        <p className="faculty-text">ชื่อคณะ</p>

        {/* Dropdown Section */}
        <div className="dropdown">
          <button className="dropbtn">ปีหลักสูตร</button>
          <div className="dropdown-content">
            <a href="#option1">ปี 55</a>
            <a href="#option2">ปี 60</a>
            <a href="#option3">ปี 65</a>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="file-upload">
          <label htmlFor="fileInput">Upload</label>
          {/* <input type="file" id="fileInput" name="fileInput" accept=".pdf, .doc, .docx , .xlsx, .csv" {...props} /> */}
          <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </div>
    </>
  );
}

export default EditCourseContent;
