import React, { Component } from 'react'

 class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         username:' ',
         comment:' ',
         course:' '
      }
    }
    usernamehandler=(event)=>{
        this.setState({
            username:event.target.value
        })
    }
    commenthandler=(event)=>{
        this.setState({
            comment:event.target.value
        })
    }
    coursehandler=(event)=>{
        this.setState({
            course:event.target.value
        })
    }
    submithandler=(event)=>{
        alert(`${this.state.username} ${this.state.comment} ${this.state.course }`)
    }
  render() {
    return (

      <form onSubmit={this.submithandler}>
        <label>Username: </label>
        <input type="text" value={this.state.username} onChange={this.usernamehandler}></input>
        <br></br>
        <label>Comments: </label>
        <textarea value={this.state.comment} onChange={this.commenthandler}></textarea>
        <br></br>
        <select value={this.state.course} onChange={this.coursehandler}>
            <option valve='javascript'>Javascript</option>
            <option valve='react'>React</option>
            <option valve='angular'>Angular</option>
        </select>
        <br></br>
        <button type='submit'>submit</button>
      </form>
    )
  }
}

export default Form
