import React from 'react'
import "./NewsContent.css"

function NewsContent() {
  return (
    <>
      <div className="rounded-rectangle">
        <p className="faculty-text">ข่าวสาร</p>
        <div className="file-upload">
          <label htmlFor="fileInput">สร้างข่าว</label>
        </div>
      </div>
    </>
  )
}

export default NewsContent;