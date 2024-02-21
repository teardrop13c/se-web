import { Form, Input } from "antd";
import React from "react";

function UserNewsContent() {
  return (
    <div className="rounded-rectangle">
      <h2>ประกาศ</h2>
      <div>
        <div>
          <Form>
            <h3>news</h3>
            <Input placeholder="content" />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserNewsContent;
