import React from 'react'
import './style.css';
export default function Style(props) {
    let className=props.heading?'heading':''
  return (
    <div>
      <h1 className={`${className} large_font`}>Style react componenet</h1>
    </div>
  )
}
