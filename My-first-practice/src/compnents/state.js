import React, { Component } from 'react';

 class Subscribe extends Component {
    
    constructor() {
        super();
        this.state={Channel : "NIGIST youtube channel"};  
        
    }
     ChangeMessage() {
        
            this.setState({Channel: "Thanks for subscribed"});

         
    }
    
    
  render() {
    return (
      <div>
        <h1>
        {this.state.Channel}
        </h1>
        <button onClick={ () => this.ChangeMessage()}> Subscribe </button>
      </div>
    )
  }
}

export default Subscribe
