import { Button, Col, Form, Input, Row, Card } from "antd";
import React, { useState, useEffect } from "react";
import "./RegisterContent.css";
import Axios from 'axios'

function RegisterContent() {
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
    Axios.post('http://localhost:3001/create', {
      subjectReg_id: subjectReg_id,
      lec_group: lec_group,
      lab_group: lab_group,
      major_year: major_year,
      roomReg_ranking: roomReg_ranking,
      user_email: user_email
    }).then(() => {
      getRegister();
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
            <Input placeholder="เลือกสาขา"
              onChange={(event) => {
                setMajor_year(event.target.value)
              }}
            />
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
              <Input placeholder="เลือกวิชา"
                onChange={(event) => {
                  setSubjectReg_id(event.target.value)
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
      {registerteacherList.map((val, key) => {
        return (
          <Card style={{ background: "#d9d9d9" }} key={key}>
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
