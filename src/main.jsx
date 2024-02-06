import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Schedule from './components/SideMenu/Schedule.jsx'
import Namelist from './components/SideMenu/Namelist.jsx'
import EditCourse from './components/SideMenu/EditCourse.jsx'
import News from './components/SideMenu/News.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Schedule />
  },
  {
    path:"namelist",
    element: <Namelist />
  },
  {
    path:"editCourse",
    element: <EditCourse />
  },
  {
    path:"news",
    element: <News />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
