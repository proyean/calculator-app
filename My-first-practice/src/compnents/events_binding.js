import React, { Component } from 'react';

class Events_binding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "Good Morning", // Correct state initialization
    };
    // this.changestates=this.changestates.bind(this);
  }

  changestates() {
    this.setState({ msg: "Good morning, mami!!" }); // Correct state update
  }

  render() {
    return (
      <div>
        <h1>{this.state.msg}</h1> {/* Correctly accessing state */}
        {/* <button onClick={this.changestates.bind(this)}>Click here</button> */}
        {/* <button onClick={this.changestates}>Click here</button> */}
        <button onClick={()=>this.changestates()}>Click here</button>
      </div>
    );
  }
}

export default Events_binding;
// In JavaScript, the value of this depends on how a function is called. In React, methods defined in class components don't automatically bind this to the component instance.
//  Binding ensures the correct context (this) is used when the event handler is called.