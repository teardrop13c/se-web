import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // import reducer ของ authSlice ที่เราสร้างไว้

export const store = configureStore({
  reducer: {
    auth: authReducer, // กำหนด reducer ของ authSlice เข้ากับ state ชื่อ "auth"
    // สามารถเพิ่ม reducers อื่นๆ ตามต้องการได้ เช่น
    // user: userReducer,
    // products: productsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), // ใช้ middleware เริ่มต้น
  devTools: process.env.NODE_ENV !== 'production', // เปิดใช้งาน DevTools ในโหมด development เท่านั้น
});
