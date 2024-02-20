import { Button, Col, Form, Input, Row, Card } from "antd";
import React from "react";
import "./RegisterContent.css";

function RegisterContent() {
  return (
    <div className="top-regis">
      <Row gutter={16} style={{ flexDirection: "row" }}>
        <Col span={4}>
          <h3>คณะ</h3>
          <Form name="คณะ">
            <Input placeholder="เลือกคณะ" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>สาขา</h3>
          <Form>
            <Input placeholder="เลือกสาขา" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>ปีการศึกษา</h3>
          <Form>
            <Input placeholder="เลือกปีการศึกษา" />
          </Form>
        </Col>
        <Col span={4}>
          <h3>ภาคการศึกษา</h3>
          <Form>
            <Input placeholder="เลือกภาคการศึกษา" />
          </Form>
        </Col>
      </Row>
      <br />
      <Card style={{ background: "#d9d9d9" }}>
        <Row gutter={16} style={{ flexDirection: "row" }}>
          <Col span={6}>
            <h3>วิชา</h3>
            <Form>
              <Input placeholder="เลือกวิชา" />
            </Form>
          </Col>
          <Col span={6}>
            <h3>หมู่บรรยายและจำนวนนิสิต</h3>
            <Form>
              <Input placeholder="จำนวน" />
            </Form>
          </Col>
          <Col span={6}>
            <h3>หมู่ปฎิบัติและจำนวนนิสิต</h3>
            <Form>
              <Input placeholder="จำนวน" />
            </Form>
          </Col>
          <Col span={6}>
            <h3>ห้องเรียน</h3>
            <Form>
              <Input placeholder="เลือกห้อง" />
            </Form>
          </Col>
        </Row>
        <br />
        <Button className="submit-button">ยืนยัน</Button>
        <br />
      </Card>
    </div>
  );
}

export default RegisterContent;
