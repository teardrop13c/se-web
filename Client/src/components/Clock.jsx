import React, { useState, useEffect } from "react";
import "./Clock.css"; // Import CSS file

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setTime(new Date());
  }

  return (
    <div className="rounded-rectangle">
    <div className="clock">
      <h1 className="welcome">ยินดีต้อนรับเข้าสู่ระบบลงทะเบียนการสอน</h1>
      <h1 className="clock-heading">Current Time:</h1>
      <div className="clock-time">{time.toLocaleTimeString()}</div>
    </div>
    </div>
  );
}

export default Clock;
