import React, { useState } from 'react'


function Usestatecounter2() {
    const initialvalue=0;
    const [count, countupdater]=useState(initialvalue);
  return (
    <div>
        Counter:{count}
      <button onClick={() => countupdater(initialvalue)}>Reset</button>
      <button onClick={() => countupdater(count+1)}>Increment</button>
      <button onClick={() => countupdater(count -1)}>Decrement</button>
      
    </div>
  )
}

export default Usestatecounter2
