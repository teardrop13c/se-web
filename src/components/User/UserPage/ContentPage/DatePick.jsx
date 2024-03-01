import { Button, Select } from "antd";
import React from "react";
import "./DatePick.css";

function DatePick() {
  return (
    <div className="select-date">
      <Select
        style={{ width: "200px" }}
        placeholder="เลือกวัน"
        options={[
          {
            value: "monday",
            label: "วันจันทร์",
          },
          {
            value: "tuesday",
            label: "วันอังคาร",
          },
          {
            value: "wednesday",
            label: "วันพุธ",
          },
          {
            value: "thursday",
            label: "วันพฤหัสบดี",
          },
          {
            value: "friday",
            label: "วันศุกร์",
          },
          {
            value: "saturday",
            label: "วันเสาร์",
          },
          {
            value: "sunday",
            label: "วันอาทิตย์",
          },
        ]}
      />


      <Select
        style={{ width: "200px" }}
        placeholder="เลือกเวลา"
        options={[
          {
            value: "8:00 - 11:00",
            label: "8:00 - 11:00",
          },
          {
            value: "8:30 - 11:30",
            label: "8:30 - 11:30",
          },
          {
            value: "9:00 - 12:00",
            label: "9:00 - 12:00",
          },
          {
            value: "13:00 - 16:00",
            label: "13:00 - 16:00",
          },
          {
            value: "16:30 - 19:30",
            label: "16:30 - 19:30",
          },
        ]}
      />
      <Button type="defult" className="button-add"> + </Button>
      <Button type="defult" className="submit-button">ยืนยัน</Button>
    </div>
  );
}

export default DatePick;