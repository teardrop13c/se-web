import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Schedule from './components/Admin/AdminPage/Schedule'
import NameList from './components/Admin/AdminPage/NameList'
import EditCourse from './components/Admin/AdminPage/EditCourse.jsx'
import News from './components/Admin/AdminPage/News.jsx'
import HomeUser from './components/User/UserPage/HomeUser.jsx'
import UserSchedule from './components/User/UserPage/UserSchedule'
import UserRegister from './components/User/UserPage/UserRegister'
import UserNews from './components/User/UserPage/UserNews'
import HomeAdmin from './components/Admin/AdminPage/HomeAdmin.jsx'
import RegisterTime from './components/Admin/AdminPage/RegisterTime'
import Login from './components/Login/Login'

import {store} from './store/Store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([

  // ***** Login Page ***** //
  {
    path:"/",
    element: <Login />
  },
  
  // ***** Admin Page ***** //
  {
    path:"/HomeAdmin",
    element: <HomeAdmin />
  },
  {
    path:"Schedule",
    element: <Schedule />
  },
  {
    path:"Namelist",
    element: <NameList />
  },
  {
    path:"EditCourse",
    element: <EditCourse />
  },
  {
    path:"News",
    element: <News />
  },
  {
    path:"RegisterTime",
    element: <RegisterTime />
  },

  // ***** User Page ***** //
  {
    path:"HomeUser",
    element: <HomeUser />
  },
  {
    path:"UserSchedule",
    element: <UserSchedule />
  },
  {
    path:"UserRegister",
    element: <UserRegister />
  },
  {
    path:"UserNews",
    element: <UserNews />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
