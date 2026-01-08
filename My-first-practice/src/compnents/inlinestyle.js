import React from 'react'

function Inlinestyle() {
    const heading={
        color:'brown',
        backgroundColor:'black',
        fontSize:'80px'
    }
  return (
    <div>
      <h1 className='Regularcss'>Regular styles</h1>
      <h1 style={heading}>inline style for react</h1>
    </div>
  )
}

export default Inlinestyle
