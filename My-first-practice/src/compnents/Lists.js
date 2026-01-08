import React from 'react'

export default function Lists() {
    const prog=['c++','java', 'javascript' , 'javascript']
  return (
    <div>
      {/* <h1>{prog[0]} </h1>
      <h1>{prog[1]} </h1>
      <h1>{prog[2]} </h1> */}
      { 
      prog.map((name, index) => <h1 key={index}><li type="square">{name}</li></h1>)
      }
      
       {/* {
        prog.map(name => <h1 key={name}>{name}</h1>)
       } */}
     </div>
  )
}
