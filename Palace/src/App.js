import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// Pages
import MainPage from './pages';
import HelpPage from './pages/help';
import JoinLobby from './pages/join.js'
import CreateLobby from './pages/create.js';
import Game from './pages/game.js';
import NotFoundPage from './pages/404';

class App extends React.Component {
   render(){
      return (
         <Router>
            <Switch>
               <Route exact path='/' component={MainPage} /> {/* Home Page */}
               <Route exact path='/help' component={HelpPage} /> {/* How to Play Page */}
               <Route exact path='/join' component={JoinLobby} /> {/* Join Lobby Page */}
               <Route exact path='/create' component={CreateLobby} /> {/* New Lobby Page */}
               <Route exact path='/game' component={Game} /> {/* 404 Page */}
               <Route exact path='/404' component={NotFoundPage} /> {/* 404 Page */}
               <Redirect to='/404'/>
            </Switch>
         </Router>
      );

   }
}

export default App;
