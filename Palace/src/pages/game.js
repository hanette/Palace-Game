import React from 'react';
import '../css/Card.css';
import {BrowserRouter as Link} from 'react-router-dom';
// import cardDeck from './images/deck.png';
// import cardCover from './images/cover.png';

class Player{
   constructor(cards){
      this.facedown = cards.slice(0,3);
      this.hand = cards.slice(3);
      this.faceup = [];
      this.hideFaceDown();
   }

   // Return which card player is on or if they are done
   status(){
      if(this.hand.length > 0){
         return 3;
      } else if (this.faceup.length > 0){
         return 2;
      } else if (this.facedown.length > 0){
         return 1;
      } else{
         return 0;
      }
   }

   // Change facedown card's hidden to be true
   hideFaceDown(){
      this.facedown[0].hidden = true;
      this.facedown[1].hidden = true;
      this.facedown[2].hidden = true;
   }

   // Given array of hand's index, add to faceup and remove from hand
   chooseFaceUp(a){
      console.log(this.hand[a[0]],this.hand[a[1]],this.hand[a[2]]);
      this.faceup.push(this.hand[a[0]]);
      this.faceup.push(this.hand[a[1]]);
      this.faceup.push(this.hand[a[2]]);
      a.sort(function(a,b){ // Sort the index to be in order
         return a-b;
      });
      this.hand.splice(a[2], 1);
      this.hand.splice(a[1], 1);
      this.hand.splice(a[0], 1);
   }
}

export class Game extends React.Component {
   constructor(){
      super();
      this.deck = [];
      this.discard = [];
      this.bomb = {value: -1, count: 0};
      this.reset();
      this.shuffle();
      this.player1 = new Player(this.deck.splice(0,9));
      this.player2 = new Player(this.deck.splice(0,9));
      this.player3 = new Player(this.deck.splice(0,9));
      this.player4 = new Player(this.deck.splice(0,9));
      this.clearDiscard = this.clearDiscard.bind(this);
      this.takeFromDeck = this.takeFromDeck.bind(this);
      this.playGame.call(this);
   }

   // New Cards
   reset(){
      this.deck = [];
      for(let suit of ["spades", "clubs", "diamonds", "hearts"]){
         for(let i = 2; i < 15; i++){
            this.deck.push({
               suit: suit,
               value: i,
               hidden: false
            });
         }
      }
   }

   // Shuffle the cards
   shuffle(){
      console.log(this.deck.length);
      for(var i = this.deck.length-1; i>0; i--){
         let j = Math.floor(Math.random()*i);
         let temp = this.deck[i];
         this.deck[i] = this.deck[j];
         this.deck[j] = temp;
      }
   }

   // Player choose their faceup cards // DEBUG: be buttons
   setFaceUp(player){
      let allhand = "";
      for(var i = 0; i < player.hand.length; i++){
         allhand += player.hand[i].value + " ";
      }
      console.log("Current Cards:",allhand);
      var pinput = prompt("Choose your 3 face down cards: "+" "+player.hand[0].value+" "+player.hand[1].value+" "+player.hand[2].value+" "+player.hand[3].value+" "+player.hand[4].value+" "+player.hand[5].value);
      var pdown = pinput.split(',');
      player.chooseFaceUp(pdown);
   }

   // Take one from deck // DEBUG: change to based on amount on player hand, player class
   takeFromDeck(){
      if(this.deck.length > 0){
         let take = this.deck.pop();
         console.log(take);
         if(this.playable([take],false)){
            this.discard.push(take);
            console.log("We take it");
         } else{
            console.log("We say no");
         }
         console.log(this.discard[this.discard.length-1]);
         console.log("Remaining in Deck:", this.deck.length);
      }
   }

   // Clear Discard, used when players play 10 or bomb
   clearDiscard(){
      this.discard = [];
   }

   // Give discard pile to player if they can't play
   givePile(player){
      player.hand = player.hand.concat(this.discard);
      this.discard = []
   }

   bombCheck(value){
      if (this.bomb.value == value){
         this.bomb.count += 1;
      } else{
         this.bomb.value = value;
         this.bomb.count = 0;
      }
      if (this.bomb.count >= 3){
         this.clearDiscard();
         this.bomb.count = 0;
         this.bomb.value = -1;
      }
   }
   // Check if playable based on last card on discard, assume all cards are the same value
   playable(cards, underSeven){
      if(this.discard.length > 0){
         let last = this.discard[this.discard.length-1];
         if (cards[0].value === 2 || cards[0].value === 10 || cards[0].value === 7 || cards[0].value >= last.value){
            return true;
         } else {
            if(underSeven){
               return true;
            }
            return false;
         }
      }
      return true;
   }

   playerTurn(player){
   //    console.log("Last card played:", this.discard[this.discard.length-1]);
   //    let allhand = "";
   //    for(var i = 0; i < player.hand.length; i++){
   //       allhand += player.hand[i].value + " ";
   //    }
   //    console.log("Hand:",allhand);
   //    allhand = "";
   //    for(var i = 0; i < player.faceup.length; i++){
   //       allhand += player.faceup[i].value + " ";
   //    }
   //    console.log("Face Up:",allhand);
   //    console.log("Face Down Remaining:", player.facedown.length);
   //
   //    var pInput = prompt("Play your card by inputting the index:");
   //    // If player can't play, add pile to their hand
   //    if(pInput == "None"){
   //       player.addPileToHand();
   //       return;
   //    }
   //
   //    var pArr = pInput.split(','); // separate input into an array
   //    pArr.sort(function(a,b){ // Sort the index to be in order
   //       return b-a;
   //    });
   //
   //    var check = true; // check is playable
   //    var cardArr = []; // contains card of chosen cards
   //
   //    // Iterate through all input indexes and check if it's playable
   //    let same = player.hand[pArr[0]];
   //    for(var i = 0; i < pArr.length; i++){
   //
   //       if(pArr[i] > player.hand.length-1 || same!=player.hand[pArr[i]]){
   //          console.log("Not a valid Index or differnt values");
   //          playerTurn(player);
   //          return;
   //       }
   //       cardArr.push(player.hand[pArr[i]]);
   //       console.log("You've chosen:",cardArr[i]);
   //
   //    // Check if cards are playable
   //    check = playable(cardArr);
   //    if (!check){
   //       console.log("Can't play with these cards", cardArr);
   //       playerTurn(player);
   //       return;
   //    }
   }

   // Set up & Cycle through each player until soneone wins
   playGame(){
      this.setFaceUp(this.player1);
      this.setFaceUp(this.player2);
      this.setFaceUp(this.player3);
      this.setFaceUp(this.player4);
      while(true){
         console.log("Player 1 Turn");
         this.playerTurn(this.player1);
         if(this.player1.status() == 0) break;
         console.log("Player 2 Turn");
         this.playerTurn(this.player2);
         if(this.player2.status() == 0) break;
         console.log("Player 3 Turn");
         this.playerTurn(this.player3);
         if(this.player3.status() == 0) break;
         console.log("Player 4 Turn");
         this.playerTurn(this.player4);
         if(this.player4.status() == 0) break;
      }
   }

   render(){
      return(
         <div className="App">
            <div className="help"><br/><Link to='/'><button><b>←</b></button></Link></div>
            <button onClick={this.takeFromDeck}>Take from Deck</button>
            <button onClick={this.clearDiscard}>Clear Discard</button>
            {this.playGame}
         </div>
      )
   }
}

export default Game;
