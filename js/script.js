"use strict";

var card; // Card Design
var suits = ["spades", "clubs", "diamonds", "hearts"];
var deck = [];
var discard = [];
var pile = [];
var player1;
var player2;
var player3;
var player4;

// Card Creation ============================================
// Go through each suit and create one of each card
function createDeck(){
   deck.length = 0;
   suits.forEach(function(suit){
      for(var i = 2; i < 15; i++){
         deck.push({
            suit: suit,
            value: i,
            hidden: false
         });
      };
   });
   // console.log("Creating Deck:",deck); // DEBUG: print entire deck
}
// Card shuffle =============================================
function shuffle(){
   for(var i = deck.length-1; i>0; i--){
      let j = Math.floor(Math.random()*i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
   }
   // console.log("Shuffled:",deck); // DEBUG: print entire deck
}

// Player Class =============================================
class Player {
   constructor(cards) {
      this.facedown = cards.slice(0,3);
      this.hand = cards.slice(3);
      this.faceup = [];
      this.hideFaceDown();
   }

   // Change facedown card's hidden to be true
   hideFaceDown(){
      this.facedown[0].hidden = true;
      this.facedown[1].hidden = true;
      this.facedown[2].hidden = true;
   }

   // Given array of hand's index, add to faceup and remove from hand
   chooseFaceUp(a){
      this.faceup.push(this.hand[a[0]]);
      this.faceup.push(this.hand[a[1]]);
      this.faceup.push(this.hand[a[2]]);
      this.removeFromHand(this.hand[a[0]]);
      this.removeFromHand(this.hand[a[1]]);
      this.removeFromHand(this.hand[a[2]]);
   }

   // Add array of cards to hands and clear pile
   addPileToHand(){
      this.hand = this.hand.concat(pile);
   }

   // Given card object, remove from hand
   removeFromHand(card){
         this.hand.splice(this.hand.indexOf(card), 1);
   }

   // Remove a card from facedown and add to pile if valid. addPileToHand if not.
   playFaceDown(){ // DEBUG: not tested yet
      var chosen = this.facedown.pop();
      // chosen = this.facedown.splice(Math.floor(Math.random()*(this.facedown),1);
      var check = playable([chosen]);
      console.log("check:",check);
      if(check){
         pile.push(chosen);
      } else{
         pile.push(chosen);
         this.addPileToHand();
         pile.length = 0;
      }
   }

   // Given index of card in hand, add to end of pile and remove from hand
   playCard(index){
      pile.push(this.hand.splice(index,1)[0]);
   }

   // Given amount, remove that amount of cards from deck and add to hand
   takeFromDeck(amt){
      while(amt > 0){
         this.hand.push(deck.pop());
         amt--;
      }
   }

}
// Check conditions ==========================================
// Given an array of card(s), check if it's playable based on last card on deck
function playable(card){
   if (pile.length > 0){
      var lastdeck = pile[pile.length-1];
      if (card.length == 1){ // if it's only one card, check it with lastdeck
         if(card[0].value == 2 || card[0].value == 10 || card[0].value == 7){
            return true;
         } else if (card[0].value >= lastdeck.value){
            return true;
         } else{
            return false;
         }
      } else { // more than one card
         let same = card[0].value;
         for(var i = 1; i<card.length-1;i++){ // check if array are all same
            if(same == card[i].value){
               same = card[i].value;
            } else{
               return false;
            }
         }
         if(card[0].value >= lastdeck.value || card[0].value == 2 || card[0].value == 10 || card[0].value == 7){
            return true;
         } else {
            return false;
         }
      }
   } else{ // deck is empty
      if (card.length == 1){ // if it's only one card, return true
         return true;
      } else {
         let same = card[0].value;
         for(var i = 1; i<card.length-1;i++){
            if(same == card[i].value){
               same = card[i].value;
            } else{
               return false;
            }
         }
         return true;
      }
   }
}
// Set Up ====================================================
function setUp(){
   createDeck();
   shuffle();
   player1 = new Player(deck.splice(0,9));
   player2 = new Player(deck.splice(0,9));
   player3 = new Player(deck.splice(0,9));
   player4 = new Player(deck.splice(0,9));

   /*
   console.log("Deck after player:", deck); // DEBUG: Print deck after creating players
   console.log(player1); // DEBUG: check what player 1 has
   console.log(player2); // DEBUG: check what player 2 has
   console.log(player3); // DEBUG: check what player 3 has
   console.log(player4); // DEBUG: check what player 4 has
   */
}

// User Experience ===========================================
function startGame() {
   setUp();
   canvas.start();
   card = new component(50,35, "white", 10, 120);
   console.log(player4.hand[0].value,player4.hand[1].value,player4.hand[2].value,player4.hand[3].value);
   var p4input = prompt("Choose your 3 face down cards: "+" "+player4.hand[0].value+" "+player4.hand[1].value+" "+player4.hand[2].value+" "+player4.hand[3].value+" "+player4.hand[4].value+" "+player4.hand[5].value);
   var p4down = p4input.split(',');
   player4.chooseFaceUp(p4down);
   console.log(player4); // DEBUG: check what player 4 has
   player4.takeFromDeck(1);
   player4.playFaceDown();
   player4.playFaceDown();
   player4.playFaceDown();
   console.log("pile",pile); // DEBUG: Print pile
}

// Game Area
var canvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 750;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 20);
    },
    clear : function() {
      this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
   }
}

// Component
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
      var ctx = canvas.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.strokeRect(this.x, this.y, this.width, this.height);
   }
}

function updateCanvas() {
  canvas.clear();
  card.update();
}

// Old =============================================
/* removeFromHand(card){
   if (cards.length > 1){
      let indexCount = [];
      let check = cards[0];
      for(var i = 1; i < cards.length(); i++){
         if(check.value == cards[i].value){
            check = cards[i];
            indexCount.push(this.hand.indexOf(cards[i]));
            // this.hand.splice(this.hand.indexOf(cards[i]), 1);
         } else { // DEBUG: Remove once outside function check is made
            console.log("Cannot discard different values at the same time.");
            return;
         }
      }
      for(var i = 0; i<indexCount.length;i++){ // DEBUG: Remove once outside function check is made
         if (index > -1){
            this.hand.splice(indexCount[i], 1);
         }
      }
   } else{
      this.hand.splice(this.hand.indexOf(card), 1);
   }
} */