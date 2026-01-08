import React, { Component } from 'react'

export class Conditionalrendering extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
        issubscribe:false
     }
   }
    
  render() {
    // #1 if else
    // if(this.state.issubscribe)
    // return (
    //   <div>
    //    <h1>subscribed</h1> 
    //   </div>
    // )
    // else {
    //     return (
    //         <div>
    //          <h1>subscribe</h1> 
    //         </div>
    //       )
    // #2 ternary operator
    // return(
    //   this.state.issubscribe ?
    //   <div><h1>subscribed</h1> </div>:
    //   <div> <h1>subscribe</h1> </div>
    // )
    // #logical operator used only one conditions
    return(
        this.state.issubscribe && (<div><h1>subscribed</h1></div>)
    )
    }
  }


export default Conditionalrendering
