import React from "react";
import '../css/App.css';
import {Link} from 'react-router-dom';


const MainPage = () => {
   return(
      <div className="App">
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
         Palace<br></br>Card Game
         </div>
         <Link to='/join'><button>Join Lobby</button></Link>
         <Link to='/create'><button>New Lobby</button></Link>
         <br></br>
         <Link to='/help'><button>How to Play</button></Link>

      </div>
   );
};

export default MainPage;
