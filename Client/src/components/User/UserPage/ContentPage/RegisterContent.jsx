import { Button, Col, Form, Input, Row, Card, Cascader,Select,Space } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "./RegisterContent.css";
import Axios from 'axios'

function RegisterContent() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [labelString, setLabelString] = useState('');
  const [type, setType] = useState('');


  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
        const cascaderOptions = data.map(item => ({
          value: item.subject_ID,
          label: `${item.subject_ID} - ${item.subjact_name} - ${item.credite}`,
        }));
        setOptions(cascaderOptions);
      })
      .catch(err => console.log(err));
  }, [type]);

  const findSubjectNameById = (subjectId) => {
    const subject = data.find(item => item.subject_ID === subjectId);
    return subject ? subject.subjact_name : '';
  };

  const onChange = (value) => {
    if (value && value.length > 0) {
      const subjectID = value[0];
      const subjectName = findSubjectNameById(subjectID, data);
      const subjectLabel = data.find(item => item.subject_ID === subjectID);
      const label = `${subjectLabel.subject_ID} - ${subjectLabel.subjact_name} - ${subjectLabel.credite}`;
      setLabelString(label);
      console.log('Subject ID:', subjectID);
      console.log('Subject Name:', subjectName);
      console.log('Subject Label:', label);
    }
  };
  
  const [subjectReg_id, setSubjectReg_id] = useState("");
  const [lec_group, setLec_group] = useState(0);
  const [lab_group, setLab_group] = useState(0);
  const [major_year, setMajor_year] = useState("");
  const [roomReg_ranking, setRoomReg_ranking] = useState("");
  const [user_email, setUser_email] = useState("");
  const [newSubjectReg_id, setNewSubjectReg_id] = useState(0);
  const [registerteacherList, setRegisterteacherList] = useState([]);

  const getRegister = () => {
    Axios.get('http://localhost:3001/registerteacher')
      .then((response) => {
        setRegisterteacherList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getRegister();
  }, []);

  const addRegister = () => {
    if (!labelString || !lec_group || !lab_group || !roomReg_ranking || !profile.email ) {
      console.log('โปรดกรอกข้อมูลให้ครบทุกช่อง');
      return; // หยุดการทำงานทันทีถ้าข้อมูลไม่ครบ
    }
  
    Axios.post('http://localhost:3001/create', {
      subjectReg_id: labelString, // หรือแก้ให้เป็น subjectID ก็ได้ตามที่คุณต้องการ
      lec_group: lec_group,
      lab_group: lab_group,
      major_year: major_year,
      roomReg_ranking: roomReg_ranking,
      user_email: profile.email
    }).then(() => {
      getRegister();
    }).catch(error => {
      console.log('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    });
  };

  const updateRegisterSubject = (reg_id) => {
    Axios.put("http://localhost:3001/update", {
      subjectReg_id: newSubjectReg_id, reg_id: reg_id
    }).then((response) => {
      setRegisterteacherList(
        registerteacherList.map((val) => {
          return val.reg_id === reg_id
            ? {
              reg_id: val.reg_id,
              subjectReg_id: newSubjectReg_id,
              lec_group: val.lec_group,
              lab_group: val.lab_group,
              major_year: val.major_year,
              roomReg_ranking: val.roomReg_ranking,
              user_email: val.user_email
            } : val;
        })
      )
    })
  }

  const deleteRegister = (reg_id) => {
    Axios.delete(`http://localhost:3001/delete/${reg_id}`).then((response) => {
      setRegisterteacherList(
        registerteacherList.filter((val) => {
          return val.reg_id !== reg_id;
        })
      )
    })
  }

  const handleChange = (value) => {
    setType(value);
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    // ตรวจสอบว่า type ไม่ใช่ค่าว่าง
    if (type.trim() !== '') {
      sendDataToNode();
    }
  }, [type]);

  const sendDataToNode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type })
      });
      const data = await response.json();
      console.log(data); // ประมวลผลผลลัพธ์จาก Node.js
    } catch (error) {
      console.error('Error sending data to Node.js:', error);
    }
  }
  

  return (
    <div className="top-regis">
      <Row gutter={16} style={{ flexDirection: "row" }}>
        <Col span={4}>
          <h3>คณะ</h3>
          <Form name="คณะ">
            <Input placeholder="วิศวกรรมศาสตร์" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>สาขา</h3>
          <Form>
            {/* <Input placeholder="เลือกสาขา"
              onChange={(event) => {
                setMajor_year(event.target.value)
              }}
            /> */}
        <Space wrap>
        <Select
          placeholder="สาขาวิชา"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'T05',
              label: 't05',
            },
            {
              value: 'T12',
              label: 't12',
            },
            {
              value: 'T13',
              label: 't13',
            },
            {
              value: 'T14',
              label: 't14',
            },
            {
              value: 'T17',
              label: 't17',
            },
          ]}
          />
          </Space>
          </Form>
        </Col>
        <Col span={4}>
          <h3>ปีการศึกษา</h3>
          <Form>
            <Input placeholder="2567" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>ภาคการศึกษา</h3>
          <Form>
            <Input placeholder="ภาคปลาย" />
          </Form>
        </Col>
      </Row>
      <br />
      <Card style={{ background: "#d9d9d9" }}>
        <Row gutter={16} style={{ flexDirection: "row" }}>
          <Col span={6}>
            <h3>วิชา</h3>
            <Form>
            <Cascader
            options={options}
            onChange={onChange}
            placeholder="Please select"
            showSearch={{
              filter: (inputValue, path) =>
                path.some(option =>
                  option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
                ),
            }}
            />
          </Form>
          </Col>
          <Col span={6}>
            <h3>หมู่บรรยายและจำนวนนิสิต</h3>
            <Form>
              <Input placeholder="จำนวน"
                onChange={(event) => {
                  setLec_group(event.target.value)
                }}
              />
            </Form>
          </Col>
          <Col span={6}>
            <h3>หมู่ปฎิบัติและจำนวนนิสิต</h3>
            <Form>
              <Input placeholder="จำนวน"
                onChange={(event) => {
                  setLab_group(event.target.value)
                }}
              />
            </Form>
          </Col>
          <Col span={6}>
            <h3>ห้องเรียน</h3>
            <Form>
              <Input placeholder="เลือกห้อง"
                onChange={(event) => {
                  setRoomReg_ranking(event.target.value)
                }}
              />
            </Form>
          </Col>
        </Row>
        <br />
        <Button className="submit-button" onClick={addRegister}>ยืนยัน</Button>
        <br />
      </Card>
      {/* {registerteacherList.map((val, index) => {
        return (
          <Card style={{ background: "#d9d9d9" }} key={index}>
            <div className='employee card'>
              <p>วิชา : {val.subjectReg_id}</p>
              <p>บรรยายและจำนานนิสิต : {val.lec_group}</p>
              <p>ปฎิบัติและจำนวนนิสิต : {val.lab_group}</p>
              <p>สาขา : {val.major_year}</p>
              <p>ห้องปฎิบัติ : {val.roomReg_ranking}</p>
              <Button className='delete-button' onClick={() => { deleteRegister(val.reg_id) }}>ลบ</Button>
            </div>
          </Card>
        )
      })} */}
      {registerteacherList.map((val) => {
      return (
        <Card style={{ background: "#d9d9d9" }} key={val.reg_id}>
          <div className='employee card'>
            <p>วิชา : {val.subjectReg_id}</p>
            <p>บรรยายและจำนานนิสิต : {val.lec_group}</p>
            <p>ปฎิบัติและจำนวนนิสิต : {val.lab_group}</p>
            <p>สาขา : {val.major_year}</p>
            <p>ห้องปฎิบัติ : {val.roomReg_ranking}</p>
            <Button className='delete-button' onClick={() => { deleteRegister(val.reg_id) }}>ลบ</Button>
          </div>
        </Card>
      )
      })}
    </div>
  );
}

export default RegisterContent;
