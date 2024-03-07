const express = require('express');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'kusrc_course'
})

////////////////////////////////////////////////////////////

app.get('/register', (req, res) => {
    db.query("SELECT * FROM register", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

////////////////////////////////////////////////////////////
// กำหนดเส้นทาง GET /registerteacher เพื่อดึงข้อมูลลงทะเบียนการสอน
app.get('/registerteacher', (req, res) => {
    db.query("SELECT * FROM user_reg", (err, result) => {
        if (err) {
            console.log(err); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการดึงข้อมูล
        } else {
            res.send(result); // ส่งข้อมูลลงทะเบียนการสอนกลับไปยัง client ในรูปแบบ JSON
        }
    });
});

// กำหนดเส้นทาง POST /create เพื่อเพิ่มข้อมูลลงทะเบียนการสอน
app.post('/create', (req, res) => { 
    const { subjectReg_id, lec_group, lab_group, major_year, roomReg_ranking,user_email } = req.body
    db.query("INSERT INTO user_reg (subjectReg_id, lec_num, lab_num,major_year,roomReg_ranking,user_email) VALUES (?,?,?,?,?,?)",
        [subjectReg_id, lec_group, lab_group,major_year,roomReg_ranking,user_email],
        (err, result) => {
            if (err) {
                console.log(err); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการเพิ่มข้อมูล
            } else {
                res.send("Values inserted"); // ส่งข้อความยืนยันการเพิ่มข้อมูลกลับไปยัง client
            }
        }
    )
})

//// CRUD //////


app.put('/update', (req, res) => {
    const { id_course, subject_ID, subjact_name, credite, typeSubject } = req.body;
    db.query("UPDATE course SET subject_ID = ?, subjact_name = ?, credite = ?, typeSubject = ? WHERE id_course = ?",
        [subject_ID, subjact_name, credite, typeSubject, id_course],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error updating data' });
            } else {
                res.json({ message: 'Data updated successfully' });
            }
        }
    );
});

app.delete('/delete/:id_course', (req, res) => {
    const subject_ID = req.params.id_course;  // Assuming subject_ID is the correct field name

    if (!subject_ID) {
        console.error('Error: No subject_ID parameter provided in the DELETE request.');
        return res.status(400).json({ error: 'No subject_ID parameter provided' });
    }

    db.query("DELETE FROM course WHERE subject_ID = ?", subject_ID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting data' });
        }

        if (result.affectedRows === 0) {
            console.error(`No record found with subject_ID: ${subject_ID}`);
            return res.status(404).json({ error: 'No record found for deletion' });
        }

        console.log('Data deleted successfully');
        return res.json({ message: 'Data deleted successfully' });
    });
});


app.get('/users', (req, res) => {
    const sql = "SELECT * FROM course";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



/////////user_name and email //////////////////
app.post('/api/profile', (req, res) => {
    const profileName = req.body.name;
    const profileEmail = req.body.email;
    console.log('Received profile name:', profileName);
    console.log('Received profile email:', profileEmail);
    
    // สร้างออบเจ็กต์ JSON ที่มีข้อมูลทั้งชื่อและอีเมลของโปรไฟล์
    const responseData = {
      name: profileName,
      email: profileEmail
    };
    
    // ส่งออก JSON กลับไปยังไคลเอ็นต์
    res.json(responseData);
  });
//////////////////////////////////////////////////
/////////////////date and time///////////////////
  app.post('/api/timeData', async (req, res) => {
    const timeArray = req.body.timeArray;
    console.log('Received time array:', timeArray);

    try {
        for (const data of timeArray) {
            const day = data[0].day;
            const time = data[0].time;
            const email = data[0].name;
            const query = 'INSERT INTO useravailability (day, time, user_email) VALUES (?,?,?)';
            await db.query(query, [day, time, email]);
            console.log('Data inserted successfully:', data);
        }
        res.send('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }
});
////////////////////////////////////////////////////////////
///////////////////////uploads//////////////////////////////
app.post('/uploads', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // รับไฟล์ที่อัปโหลดจาก client
    let uploadedFile = req.files.file;

    // เก็บชื่อไฟล์เดิม
    const filename = uploadedFile.name;

    // บันทึกไฟล์ลงในโฟลเดอร์ uploads/ โดยใช้ชื่อไฟล์เดิม
    uploadedFile.mv('uploads/' + filename, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // อ่านไฟล์ Excel
        const workbook = xlsx.readFile('uploads/' + filename);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // แปลงข้อมูลในแผ่นงานเป็น JSON
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        // สร้าง values array จาก jsonData
        const values = jsonData.map(row => [row.รหัสวิชา, row.ชื่อวิชา, row.หน่วยกิจ]);

        const sql = 'INSERT INTO course (subject_ID, subjact_name, credite) VALUES ?';

        db.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).json({ error: 'Error inserting data' });
                return;
            }
            console.log('Data inserted successfully:', result);

            // ส่งการตอบกลับหลังจากที่แทรกข้อมูลลงในฐานข้อมูลเรียบร้อยแล้ว
            res.json({ message: 'Data received and inserted successfully' });
        });
    }); 
});
//////////////////////////////////////////////////////////////////////////
//// DB to back/////
app.get('/users',(req, res)=> {
    const sql = "SELECT * FROM course";
    db.query(sql,(err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})
////////////////////



// เริ่มต้นเซิร์ฟเวอร์ด้วยการรอการเชื่อมต่อผ่านพอร์ต 3001
app.listen('3001', () => {
    console.log('Server is running on port 3001');
});

