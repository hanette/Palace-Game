import React from "react";
import {Link} from 'react-router-dom';
import '../App.css';


const HelpPage = () => {
   return(
      <div className="App">
         <div className="help"><br/><Link to='/'><button><b>←</b></button></Link></div>
         <div className="App-header">
            Palace Card Game
            <br/>
            <h1>How to Play</h1>
         </div>
         <div className="help">
            <h1>Object of the Game</h1>
            <p>Play your cards in a discard pile using ascending order, and the first player to run out of cards wins.</p><br/>
            <h1>Rank of Cards</h1>
            <p><b>3 - 4 - 5 - 6 - 8 - 9 - J - Q - K</b><br/><br/>
            • The 3 is the lowest card. The A is the highest.<br/>
            • The 2 is a special card that resets the deck.<br/>
            • The 7 is a special card that reverse the rank of cards for the next player.<br/>
            • The 10 is a special card that clears the deck.</p><br/>
            <h1>Power Cards</h1>
            <p>Power cards can be played regardless of the last card played. <br/><br/>
            Playing a 2 allows the player to play again with any card they want. <br/><br/>
            Playing a 10 takes the discard pile out of the game instead of resetting it. The player can then play any card.<br/><br/>
            Playing a 7 reverses the rank order for the next player. The next player must play lower than a 7. If there are two 7's stacked on top of each other, the rank order will revert back to normal.<br/><br/>
            If four of the same numbers are played in a row, either by one player or multiple players, it clears the discard pile. Once that player plays, the rank order is reverted back to normal.</p><br/>
            <h1>The Deal</h1>
            <p>Six cards and three cards face down cards are given to each player.<br/><br/>
            Players select three cards (of the six) from their hand and place them face up on the three face down cards in front of them. Typically, higher value cards and/or power cards are placed face up.<br/><br/>
            Remaining cards are face down in the center of the table to form the Draw pile.<br/></p><br/>
            <h1>The Play</h1>
            <p> Once all players are done setting up, the start card is drawn from the Draw pile.<br/><br/>
            The first player plays a card that is equal to or of higher value than the Start card.
            Players can play multiple cards on their turn, as long as they're all of the same rank. Suit order does not matter.</p><br/>
            <p>Players will receive cards from the Draw pile if they have less than three cards in their hands until the Draw pile has been depleted.</p><br/>
            <p>On their turn, player must play a card if they can. If they can't play, they have to pick up the discard pile and add it to their hand.</p><br/>
            <p>Power cards can be played regardless of the last card played.</p><br/>
            <p>If the discard pile is empty on the player turn, the player can play any card.</p><br/>
            <p>Once the Draw pile is depleted, players rely solely on the cards in their hand. Keep playing until there are no cards left in your hand. If you can't play on your turn, you still have to pick up the discard pile and put it in your hand.</p><br/>
            <p>Once you pick up the discard pile, you must play all of those cards before playing from your cards on the table.</p><br/>
            <p>When it's your turn and you don't have a hand, play one card from your face-up cards in front of you.</p><br/>
            <p>When it's your turn and you've played all your face-up cards, pick a card that's face-down on the table. If it plays on the current card by being equal or higher, you can play it. If not, you must pick up the discard pile.</p><br/>
            <p>If you pick up the discard pile, you must play those before continuing to play your face-down cards.</p><br/>
            <p>The game ends when one players empties all of their cards</p><br/>
            </div>
            <br/><Link to='/'><button>Return</button></Link><br/><br/>
      </div>
   );
};

export default HelpPage;
