import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    profile: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        whenLogin: (state, action) => {
            state.isLoggedIn = true;        // เปลี่ยนค่า isLoggedIn เป็น true เมื่อเข้าสู่ระบบ
            state.profile = action.payload; // กำหนดค่าข้อมูลโปรไฟล์ของผู้ใช้ด้วยข้อมูลที่ส่งมาจากgoogle
        },
        whenLogout: (state) => {
            state.isLoggedIn = false;       // เปลี่ยนค่า isLoggedIn เป็น false เมื่อเข้าสู่ระบบ
            state.profile = null;           //กำหนดค่าข้อมูลโปรไฟล์ของผู้ใช้เป็นnull
        },
    },
});

export const { whenLogin, whenLogout } = authSlice.actions;

export default authSlice.reducer;
