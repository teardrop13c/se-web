import React from "react";
import "./AdminMenu.css"
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <section id="sidebar">
    <div className="sidebar">
    <Link to="/HomeAdmin" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2073.png?alt=media&token=274beb4d-0b29-4f61-bbfc-a3cf27b7b00f"
        alt="homeAdmin"
        style={{ width: "50px", height: "50px" }}
      />
        </div>
        <div className="text">HOME</div>
      </Link>
      <Link to="/Schedule" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2063.png?alt=media&token=bfc8773c-b82c-47ab-8c54-2ef1078bcf0c"
        alt="schedule"
        style={{ width: "55px", height: "55px" }}
      />
        </div>
        <div className="text">SCHEDULE</div>
      </Link>
      <Link to="/namelist" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2073.png?alt=media&token=274beb4d-0b29-4f61-bbfc-a3cf27b7b00f"
        alt="name-list"
        style={{ width: "50px", height: "50px" }}
      />
        </div>
        <div className="text">NAME LIST</div>
      </Link>
      <Link to="/editCourse" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2076.png?alt=media&token=4db5db48-8091-4785-855d-14f64f6c4408"
        alt="edit"
        style={{ width: "50px", height: "50px" }}
      />
        </div>
        <div className="text">EDIT COURSE</div>
      </Link>
      <Link to="/news" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/image%2075.png?alt=media&token=d58c0239-ee73-412a-bb96-2f62b3bf4e97"
        alt="news"
        style={{ width: "60px", height: "60px" }}
      />
        </div>
        <div className="text">NEWS</div>
      </Link>
      <Link to="/RegisterTime" className="item">
        <div className="icon">
        <img
        src="https://firebasestorage.googleapis.com/v0/b/seproject-8d5aa.appspot.com/o/Group.png?alt=media&token=ec25a841-716a-4152-9654-cef5c112d441"
        alt="RegisterTime"
        style={{ width: "50px", height: "50px" }}
      />
        </div>
        <div className="text">REGISTER TIME</div>
      </Link>
    </div> 
    </section>
  );
}

export default AdminMenu;