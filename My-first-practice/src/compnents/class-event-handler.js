import React, { Component } from 'react';

export class Event_handler extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       msg:"Hello Everyone!!"
    }
    this.Handler=this.Handler.bind(this);
  }
  
  Handler(){
this.setState({msg:"what i can  help with"});
  }
  render() {
    return (
      <div>
       <h1>{this.state.msg}</h1> 
       <button onClick={this.Handler}>click Here</button>
      </div>
    )
  }
}

export default Event_handler;
