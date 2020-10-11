import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

export class CreateLobby extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         username: ''
      }
   }

   handleSubmit = (event) => {
      event.preventDefault()
      const data = this.state
      console.log("Submit:",data);
   }

   handleInputChange = (event) => {
      event.preventDefault()
      // console.log(event);
      // console.log(event.target.name);
      // console.log(event.target.value);
      this.setState({
         [event.target.name]: event.target.value
      })
   }

   render(){
      const {username} = this.state
      return(
         <div className="App">
            <div className="help"><br/><Link to='/'><button><b>←</b></button></Link></div>
            <div className="App-header">
               <div className="card black">
                  <div className="card-top"><span>2</span><span>&spades;</span></div>
                  <div className='card-center'>&spades;</div>
                  <div className="card-bot"><span>&spades;</span><span>2</span></div>
               </div>
               <div className="card red">
                  <div className="card-top"><span>7</span><span>&hearts;</span></div>
                  <div className='card-center'>&hearts;</div>
                  <div className="card-bot"><span>&hearts;</span><span>7</span></div>
               </div>
               <div className="card black">
                  <div className="card-top"><span>10</span><span>&clubs;</span></div>
                  <div className='card-center'>&clubs;</div>
                  <div className="card-bot"><span>&clubs;</span><span>10</span></div>
               </div>
            <br></br>
            Create Lobby
            </div>
            <form onSubmit={this.handleSubmit}>
               <h4>Name<br/><input type='text' placeholder='Name' name='username' value={username} onChange={this.handleInputChange}/></h4>
               <button>Create</button>
            </form>
         </div>
      )
   }
}

export default CreateLobby;
