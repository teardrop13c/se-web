const express = require('express');
const fileUpload = require('express-fileupload');
const xlsx = require('xlsx');
const { DateTime } = require('luxon');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password:'',
    database: 'kusrc_course'
})

//////////////////user_info/////////////////
app.post('/api/profile', (req, res) => {
    const { name, email } = req.body; // รับชื่อและอีเมลที่ส่งมาจากผู้ใช้
    console.log(email);
    console.log(name);
  
    // ตรวจสอบว่ามีข้อมูลที่ซ้ำกันอยู่แล้วหรือไม่
    db.query("SELECT * FROM user WHERE user_email = ?", [email], (err, result) => {
      if (err) {
        console.error('Error checking for duplicate data:', err);
        res.status(500).send('Failed to check for duplicate data'); // ส่งข้อความผิดพลาดกลับไปยังผู้ใช้
      } else {
        if (result.length > 0) {
          console.log('Data already exists');
          res.status(409).send('Data already exists'); // ส่งข้อความว่ามีข้อมูลที่ซ้ำกันอยู่แล้วกลับไปยังผู้ใช้
        } else {
          // ไม่มีข้อมูลที่ซ้ำกัน จึงทำการแทรกข้อมูลลงในฐานข้อมูล
          db.query("INSERT INTO user (user_email, user_name) VALUES (?, ?)", [email, name], (err, result) => {
            if (err) {
              console.error('Error inserting data:', err);
              res.status(500).send('Failed to insert data'); // ส่งข้อความผิดพลาดกลับไปยังผู้ใช้
            } else {
              console.log('Data inserted successfully');
              res.status(200).send('Data inserted successfully'); // ส่งข้อความยืนยันการแทรกข้อมูลกลับไปยังผู้ใช้
            }
          });
        }
      }
    });
});

  
////////////////////////////////////////////


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


app.post('/create', (req, res) => { 
    const { subjectReg_id, lec_group, lab_group, major_year, roomReg_ranking, user_email } = req.body;
    
    // เรียกใช้คำสั่ง SQL เพื่อตั้งค่า reg_id
    db.query("SET @num := 0;", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error setting reg_id");
        } else {
            console.log("reg_id set successfully");
            // เรียกใช้คำสั่ง SQL เพื่ออัพเดทค่า reg_id
            db.query("UPDATE user_reg SET reg_id = @num := (@num+1);", (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error updating reg_id");
                } else {
                    console.log("reg_id updated successfully");
                    // เรียกใช้คำสั่ง SQL เพื่อตั้งค่า AUTO_INCREMENT
                    db.query("ALTER TABLE user_reg AUTO_INCREMENT = 1;", (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error setting AUTO_INCREMENT");
                        } else {
                            console.log("AUTO_INCREMENT set successfully");
                            // เรียกใช้คำสั่ง SQL เพื่อเพิ่มข้อมูล
                            db.query("INSERT INTO user_reg (subjectReg_id, lec_num, lab_num, major_year, roomReg_ranking, user_email) VALUES (?,?,?,?,?,?)",
                                [subjectReg_id, lec_group, lab_group, major_year, roomReg_ranking, user_email],
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).send("Error inserting values");
                                    } else {
                                        console.log("Values inserted successfully");
                                        res.status(200).send("Values inserted");
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    });
});





app.put('/update',(req,res) => {
    const {reg_id, subjectReg_id} = req.body;
    db.query("UPDATE user_reg SET subjectReg_id = ? WHERE reg_id = ?", [subjectReg_id,reg_id], (err, result) => {
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/delete/:reg_id', (req,res)=> {
    const reg_id = req.params.reg_id;
    db.query("DELETE FROM user_reg WHERE reg_id = ?", reg_id,(err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})


/////////////////date and time///////////////////
app.post('/api/timeData', async (req, res) => {
    const timeArray = req.body.timeArray;
    console.log('Received time array:', timeArray);

    try {
        await db.query("SET @num := 0;");
        console.log("useravailability_id set successfully");

        await db.query("UPDATE useravailability SET useravailability_id = @num := (@num+1);");
        console.log("useravailability_id updated successfully");

        await db.query("ALTER TABLE useravailability AUTO_INCREMENT = 1;");
        console.log("AUTO_INCREMENT set successfully");

        for (const data of timeArray) {
            const day = data[0].day;
            const time = data[0].time;
            const email = data[0].email;
            const query = 'INSERT INTO useravailability (day, time_start_end, user_email) VALUES (?,?,?)';
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
        const values = jsonData.map(row => [row.รหัสวิชา, row.ชื่อวิชา, row.หน่วยกิจ, row.ประเภทวิชา]);

        const sql = 'INSERT INTO course (subject_ID, subjact_name, credite,typeSubject) VALUES ?';

        db.query("SET @num := 0;", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error setting id_course");
        } else {
            console.log("id_course set successfully");
            // เรียกใช้คำสั่ง SQL เพื่ออัพเดทค่า reg_id
            db.query("UPDATE course SET id_course = @num := (@num+1);", (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error updating id_course");
                } else {
                    console.log("id_course updated successfully");
                    // เรียกใช้คำสั่ง SQL เพื่อตั้งค่า AUTO_INCREMENT
                    db.query("ALTER TABLE course AUTO_INCREMENT = 1;", (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error setting AUTO_INCREMENT");
                        } else {
                            console.log("AUTO_INCREMENT set successfully");
                            // เรียกใช้คำสั่ง SQL เพื่อเพิ่มข้อมูล
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
                        }
                    });
                }
            });
        }
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
////////OPEN-CLOSE/////////////////
app.post('/api/registration', (req, res) => {
    const { openingTime, closingTime } = req.body; // รับข้อมูล openingTime และ closingTime จาก req.body
    const parsedOpeningTime = DateTime.fromISO(openingTime).setZone('Asia/Bangkok');
    const parsedClosingTime = DateTime.fromISO(closingTime).setZone('Asia/Bangkok');
    const formattedDateOpen = parsedOpeningTime.toFormat('yyyy-MM-dd EEE HH:mm:ss');
    const formattedDateClose = parsedClosingTime.toFormat('yyyy-MM-dd EEE HH:mm:ss');

    console.log('Received openingTime:', formattedDateOpen);
    console.log('Received closingTime:', formattedDateClose);
  
    // ทำสิ่งที่ต้องการกับข้อมูลที่รับมา  เช่น บันทึกลงฐานข้อมูล หรือประมวลผลเพิ่มเติม
    
    res.send('Received registration data'); // ส่ง response กลับไปยัง client
});
  
///////////////////////////////////


// เริ่มต้นเซิร์ฟเวอร์ด้วยการรอการเชื่อมต่อผ่านพอร์ต 3001
app.listen('3001', () => {
    console.log('Server is running on port 3001');
})  
