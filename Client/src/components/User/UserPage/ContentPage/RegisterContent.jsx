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
  Space,
} from "antd";
import "./RegisterContent.css";
import Axios from "axios";

function RegisterContent() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [labelString, setLabelString] = useState('');
  const [type, setType] = useState('');

  const { Option } = Select;

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
  const [lec_num, setLec_num] = useState(0);
  const [lab_num, setLab_num] = useState(0);
  const [major, setMajor] = useState([]);
  const [regYear, setRegYear] = useState([]);
  const {room1, setRoom1} = useState("");
  const {room2, setRoom2} = useState("");
  const {room3, setRoom3} = useState("");

  const getRegister = () => {
    Axios.get("http://localhost:3001/register")
      .then((response) => {
        setRegisterteacherList(response.data);
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


  const handleChangeMajor = (major) => {
    setMajor(major);
  };

  const handleChangeYear = (regYear) => {
    setRegYear(regYear);
  };

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
          <h3>ปีการศึกษา</h3>
          <Form>
            <Input placeholder="ปีการศึกษา" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>ภาคการศึกษา</h3>
          <Form>
            <Input placeholder="ภาคการศึกษา" />
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
                  setLec_num(event.target.value)
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
                  setLab_num(event.target.value)
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
                value={major}
              >
                <Option value="item1">T12</Option>
                <Option value="item2">T13</Option>
                <Option value="item3">T14</Option>
                <Option value="item4">T15</Option>
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
                value={regYear}
              >
                <Option value="item1">ปี 1</Option>
                <Option value="item2">ปี 2</Option>
                <Option value="item3">ปี 3</Option>
                <Option value="item4">ปี 4</Option>
              </Select>
            </Form>
          </Col>
        </Row>
        <br />
        <h3>อันดับห้องปฎิบัติ</h3>
        <Row gutter={16} style={{ flexDirection: "row" }}>
          <Col span={3}>
            <Form>
              <Select 
                style={{ width: "100%" }} 
                placeholder="เลือกห้องที่ 1"
                onChange={(event) => {
                  setRoom1(event.target.value)
              }}
                >
                  <Option value="item1">Lab com 2</Option>
                  <Option value="item2">Lab com 3</Option>
                  <Option value="item3">Lab com DAT</Option>
              </Select>
            </Form>
          </Col>
          <Col span={3}>
            <Form>
              <Select 
                style={{ width: "100%" }} 
                placeholder="เลือกห้องที่ 2"
                onChange={(event) => {
                  setRoom2(event.target.value)
              }}
              >
                <Option value="item1">Lab com 2</Option>
                <Option value="item2">Lab com 3</Option>
                <Option value="item3">Lab com DAT</Option>
              </Select>
            </Form>
          </Col>
          <Col span={3}>
            <Form>
              <Select 
                style={{ width: "100%" }} 
                placeholder="เลือกห้องที่ 3"
                onChange={(event) => {
                  setRoom3(event.target.value)
              }}
              >
                <Option value="item1">Lab com 2</Option>
                <Option value="item2">Lab com 3</Option>
                <Option value="item3">Lab com DAT</Option>
              </Select>
            </Form>
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
              <p>วิชา : {val.subject}</p>
              <p>บรรยายและจำนานนิสิต : {val.lec_num}</p>
              <p>ปฎิบัติและจำนวนนิสิต : {val.lab_num}</p>
              <p>สาขา : {val.major}</p>
              <p>ชั้นปี : {val.regYear}</p>
              <p>ห้องปฎิบัติ 1 : {val.room1}</p>
              <p>ห้องปฎิบัติ 1 : {val.room2}</p>
              <p>ห้องปฎิบัติ 1 : {val.room3}</p>
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
