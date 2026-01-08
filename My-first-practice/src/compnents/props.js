// import React from 'react';
// const Fullname = (props) => {
//     return (
// <h1>{props.name} Sisay {props.age}</h1>

//       );
// }
 
// export default Fullname;
import React, { Component } from 'react'

export default class props extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name } Sisay {this.props.age}</h1>
      </div>
    )
  }
}
