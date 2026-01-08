import React from 'react';

 function Event_function() {
    function Handler(){
        console.log("cliked");
    }
  return (
    <div>
      <button onClick={() =>Handler()}>Click Me</button>
    </div>
  )
}
export default Event_function;