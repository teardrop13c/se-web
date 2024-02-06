import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

function App() {
  return (
    <section id="main-layout">
      <Navbar />
      <Sidebar />
      <Content />
    </section>
  )
}

export default App