import React, { createElement } from 'react';
const Wellcome = () => {
    //return ( 
    //<div>
        //<h1>Wellcome To DG TECH</h1>
    //</div>
    // );

    return React.createElement("div",{id:"div1",className:"wellc"}, createElement("h1",null,"Wellcome To DG TECH"))
}
 
export default Wellcome;
