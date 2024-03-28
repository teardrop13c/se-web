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
    <div className="background">
      <div className="rounded-rectangle">
        <div className="clock">
          <h5 className="welcome">ยินดีต้อนรับเข้าสู่ระบบลงทะเบียนการสอน</h5>
          <h5 className="clock-heading">Current Time:</h5>
          <div className="clock-time">{time.toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
