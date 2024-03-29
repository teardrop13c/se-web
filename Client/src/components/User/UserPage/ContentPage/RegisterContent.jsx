import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Card,
  Cascader,
  Select,
  Divider,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./RegisterContent.css";
import Axios from "axios";

function RegisterContent() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [labelString, setLabelString] = useState('');

  const { Option } = Select;

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        const uniqueData = data.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.subject_ID === item.subject_ID
          ))
        );
        setData(uniqueData);
        const cascaderOptions = uniqueData.map((item) => ({
          value: item.subject_ID,
          label: `${item.subject_ID} - ${item.subject_name} - ${item.credite}`,
          key: item.subject_ID, // ใช้ subject_ID เป็น key ที่ไม่ซ้ำกัน
        }));
        setOptions(cascaderOptions);
      })
      .catch(err => console.log(err));
  }, []);

  const findSubjectNameById = (subjectId) => {
    const subject = data.find((item) => item.subject_ID === subjectId);
    return subject ? subject.subject_name : "";
  };

  const onChange = (value) => {
    if (value && value.length > 0) {
      const subjectID = value[0];
      const subjectName = findSubjectNameById(subjectID, data);
      const subjectLabel = data.find((item) => item.subject_ID === subjectID);
      const label = `${subjectLabel.subject_ID} - ${subjectLabel.subject_name} - ${subjectLabel.credite}`;
      setLabelString(label);
      console.log("Subject ID:", subjectID);
      console.log("Subject Name:", subjectName);
      console.log("Subject Label:", label);
    }
  };

  const [subjectReg_id, setSubjectReg_id] = useState("");
  const [lec_group, setLec_group] = useState(0);
  const [lab_group, setLab_group] = useState(0);
  const [major_year, setMajor_year] = useState([]);
  const [roomReg_ranking, setRoomReg_ranking] = useState("");
  const [user_email, setUser_email] = useState("");
  const [newSubjectReg_id, setNewSubjectReg_id] = useState(0);
  const [registerteacherList, setRegisterteacherList] = useState([]);
  const [major, setMajor] = useState([]);
  const [student_year, setStudent_year] = useState([]);

  const getRegister = () => {
    Axios.get("http://localhost:3001/registerteacher")
      .then((response) => {const filteredData = response.data.filter(item => item.user_email === profile.email);
 
        setRegisterteacherList(filteredData);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRegister();
  }, []);

  const addRegister = () => {
    if (!labelString || !lec_group || !lab_group || !roomReg_ranking || !profile.email ) {
      message.error('โปรดกรอกข้อมูลให้ครบทุกช่อง');
      return; // หยุดการทำงานทันทีถ้าข้อมูลไม่ครบ
    }

    Axios.post("http://localhost:3001/create", {
      subjectReg_id: labelString, // หรือแก้ให้เป็น subjectID ก็ได้ตามที่คุณต้องการ
      lec_group: lec_group,
      lab_group: lab_group,
      major_year: major_year,
      student_year: student_year,
      roomReg_ranking: roomReg_ranking,
      user_email: profile.email,
    })
      .then(() => {
        getRegister();
        message.success("successfully")
      })
      .catch((error) => {
        console.log("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
      });
  };

  const updateRegisterSubject = (reg_id) => {
    Axios.put("http://localhost:3001/update", {
      subjectReg_id: newSubjectReg_id,
      reg_id: reg_id,
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
                user_email: val.user_email,
              }
            : val;
        })
      );
    });
  };

  const deleteRegister = (reg_id) => {
    Axios.delete(`http://localhost:3001/delete/${reg_id}`).then((response) => {
      setRegisterteacherList(
        registerteacherList.filter((val) => {
          return val.reg_id !== reg_id;
        })
      );
    });
  };


  const handleChangeMajor = (major_year) => {
    setMajor_year(major_year);
  };

  const handleChangeYear = (student_year) => {
    setStudent_year(student_year);
  };

  const handleChange = (value) => {
    setType(value);
    console.log(`selected ${value}`);
  };

  return (
    <div className="top-regis">
      <Row gutter={16} style={{ flexDirection: "row" }}>
        <Col span={4}>
          <h3>ปีการศึกษา</h3>
          <Form>
            <Input placeholder="ปีการศึกษา 2567s" disabled />
          </Form>
        </Col>
        <Col span={4}>
          <h3>ภาคการศึกษา</h3>
          <Form>
            <Input placeholder="ภาคการศึกษา" disabled />
          </Form>
        </Col>
      </Row>
      <br />
      <Card style={{ background: "#d9d9d9" }}>
        <Row gutter={16} style={{ flexDirection: "row" }}>
          <Col span={4}>
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
          <Col span={4}>
            <h3>บรรยายและจำนวนนิสิต</h3>
            <Form style={{ width: "200px" }}>
              <Input 
                placeholder="ใส่จำนวนนิสิต" 
                onChange={(event) => {
                  setLec_group(event.target.value)
              }}
              />
            </Form>
          </Col>
          <Col span={4}>
            <h3>ปฎิบัติและจำนวนนิสิต</h3>
            <Form style={{ width: "200px" }}>
              <Input 
                placeholder="ใส่จำนวนนิสิต" 
                onChange={(event) => {
                  setLab_group(event.target.value)
              }}
              />
            </Form>
          </Col>
          <Col span={4}>
            <h3>สาขาที่เปิด</h3>
            <Form style={{ width: "200px" }}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="เลือกสาขา"
                onChange={handleChangeMajor}
                value={major_year}
              >
                <Option value="T12">T12</Option>
                <Option value="T13">T13</Option>
                <Option value="T14">T14</Option>
                <Option value="T15">T15</Option>
              </Select>
            </Form>
          </Col>
          <Col span={4}>
            <h3>ชั้นปีที่เปิด</h3>
            <Form style={{ width: "200px" }}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="เลือกชั้นปี"
                onChange={handleChangeYear}
                value={student_year}
              >
                <Option value="ปี 1">ปี 1</Option>
                <Option value="ปี 2">ปี 2</Option>
                <Option value="ปี 3">ปี 3</Option>
                <Option value="ปี 4">ปี 4</Option>
              </Select>
            </Form>
          </Col>
        </Row>
        <br />
        <h3>อันดับห้องปฎิบัติ</h3>
        <Row gutter={16} style={{ flexDirection: "row" }}>
          <Col span={3}>
          <Select placeholder="เลือกห้องที่ต้องการ 3 ลำดับ"
                span={6}
                onChange={(value) => {
                  setRoomReg_ranking(value)
                }}
                style={{
                  width: 200,
                }}
                mode="multiple"
                options={[
                  { value: "Labcom 23" },
                  { value: "Labcom DAT" },
                  { value: "Labcom 2" },
                ]}
              />

          </Col>
        </Row>
        <br />
        <Button className="submit-button" onClick={addRegister}>
          ยืนยัน
        </Button>
      </Card>
      <Divider />
      {registerteacherList.map((val, index) => {
        return (
          <Card style={{ background: "#d9d9d9" }} key={index}>
            <div className="employee card">
              <p>วิชา : {val.subjectReg_id}</p>
              <p>บรรยายและจำนานนิสิต : {val.lec_group}</p>
              <p>ปฎิบัติและจำนวนนิสิต : {val.lab_group}</p>
              <p>สาขา : {val.major_year}</p>
              <p>ชั้นปี : {val.student_year}</p>
              <p>อันดับห้องปฎิบัติ : {val.roomReg_ranking}</p>
              <Button
                danger
                onClick={() => {
                  deleteRegister(val.reg_id);
                }}
              >
                ลบ
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default RegisterContent;
