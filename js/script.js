"use strict";

var card; // Card Design
var suits = ["spades", "clubs", "diamonds", "hearts"];
var deck = [];
var pile = [];
var player1;
var player2;
var player3;
var player4;
var inProgress = true;
var underSeven, higherSeven = false;
var bomb = {value: -1, count: 0};

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

   // Return inProgress value to be false if player empties all cards
   status(){
      if(this.facedown.length <= 0){
         inProgress = false;
         console.log("GAME OVER");
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
      this.removeFromHand(a[2]);
      this.removeFromHand(a[1]);
      this.removeFromHand(a[0]);
   }

   // Add array of cards to hands and clear pile
   addPileToHand(){
      this.hand = this.hand.concat(pile);
      pile.length = 0;
   }

   // Given card index, remove from hand
   removeFromHand(index){
         this.hand.splice(index, 1);
   }

   // Given index of card in hand and which card deck, add to end of pile and remove from hand. return value of power card or -1
   playCard(index, which){
      var check = this.checkPower(index, which);
      if(which == 0){
         bombCheck(this.hand[index].value);
         console.log("bombCheck",bomb.value, bomb.count); // DEBUG: print
         pile.push(this.hand.splice(index,1)[0]);
      } else if(which == 1){
         bombCheck(this.faceup[index].value);
         console.log("bombCheck",bomb.value, bomb.count); // DEBUG: print
         pile.push(this.faceup.splice(index,1)[0]);
      } else{
         bombCheck(this.facedown[index].value);
         console.log("bombCheck",bomb.value, bomb.count); // DEBUG: print
         pile.push(this.facedown.splice(index,1)[0]);
      }
      if(underSeven && pile[pile.length-1].value > 7 && check == -1){ // check seven conditions
         console.log("Inside underSeven");
         this.addPileToHand();
         underSeven = false;
      } else if(higherSeven && pile[pile.length-1].value < 7 && check == -1){ // check seven conditions
         console.log("Inside higherSeven");
         this.addPileToHand();
         higherSeven = false;
      }

      return check;
   }

   // If index is a power card, return value. if not, return -1
   checkPower(index, which){
      if (which == 0){
         if (this.hand[index].value == 2) return 2;
         else if (this.hand[index].value == 7) return 7;
         else if (this.hand[index].value == 10) return 10;
         else return -1;
      }
      else if (which == 1){
         if (this.faceup[index].value == 2) return 2;
         else if (this.faceup[index].value == 7) return 7;
         else if (this.faceup[index].value == 10) return 10;
         else return -1;
      }
      else if (which == 2){
         console.log("face down value", this.facedown[index].value);
         if (this.facedown[index].value == 2) return 2;
         else if (this.facedown[index].value == 7) return 7;
         else if (this.facedown[index].value == 10) return 10;
         else return -1;
      }
   }

   // Given amount, remove that amount of cards from deck and add to hand
   takeFromDeck(){
      if(deck.length > 0 && this.hand.length < 3){
         var amt = 3-this.hand.length;
      }
      while(amt > 0){
         this.hand.push(deck.pop());
         amt--;
         if(deck.length == 0){
            break;
         }
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
            if(underSeven){
               underSeven = false;
               return true;
            }
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

   // Ask player to choose their face up cards
   console.log("Player 1 Turn");
   setFaceUp(player1);
   console.log("Player 2 Turn");
   setFaceUp(player2);
   console.log("Player 3 Turn");
   setFaceUp(player3);
   console.log("Player 4 Turn");
   setFaceUp(player4);
}

// Set Face Up Card ==========================================
function setFaceUp(player){
   let allhand = "";
   for(var i = 0; i < player.hand.length; i++){
      allhand += player.hand[i].value + " ";
   }
   console.log("Current Cards:",allhand);
   var pinput = prompt("Choose your 3 face down cards: "+" "+player.hand[0].value+" "+player.hand[1].value+" "+player.hand[2].value+" "+player.hand[3].value+" "+player.hand[4].value+" "+player.hand[5].value);
   var pdown = pinput.split(',');
   player.chooseFaceUp(pdown);
}

// Play Power Card ===========================================
function playPowerCard(value,player){
   if (value == 2){
      if(underSeven) underSeven = false;
      if(higherSeven) higherSeven = false;
      playerTurn(player);
      return;
   }
   else if (value == 10){
      if(higherSeven) higherSeven = false;
      if(underSeven) underSeven = false;
      pile.length = 0;
   }
   else if (value == 7){
      if(underSeven){
         underSeven = false;
         higherSeven = true;
      } else if (higherSeven){
         higherSeven = false;
         underSeven = true;
      }else{
         underSeven = true;
      }
   }
}

// Play Hand =================================================
function playHand(player){
   // Print Player's hand
   let allhand = "";
   for(var i = 0; i < player.hand.length; i++){
      allhand += player.hand[i].value + " ";
   }

   // User Input
   console.log("Player's card:",allhand);
   var pInput = prompt("Play your card by inputting the index:");

   // If player can't play, add pile to their hand
   if(pInput == "None"){
      player.addPileToHand();
      return;
   }

   var pArr = pInput.split(','); // separate input into an array
   pArr.sort(function(a,b){ // Sort the index to be in order
      return b-a;
   });
   var check = true; // check is playable
   var cardArr = []; // contains card of chosen cards

   // Iterate through all input indexes and check if it's playable
   for(var i = 0; i < pArr.length; i++){
      if(pArr[i] > player.hand.length-1){;
         console.log("Not a valid Index");
         playHand(player);
         return;
      }
      cardArr.push(player.hand[pArr[i]]);
      console.log("You've chosen:",cardArr[i]);
   }
   // Check if cards are playable
   check = playable(cardArr);
   if (!check){
      console.log("Can't play with these cards", cardArr);
      playerTurn(player);
      return;
   }

   // Play the cards
   for (var i = 0; i < pArr.length; i++){
      var value = player.playCard(pArr[i], 0);
      console.log("value:", value);
      if (value != -1) playPowerCard(value, player);
   }

   // Grab card if deck is not empty
   player.takeFromDeck();
}

// Play Face Up ==============================================
function playFaceUp(player){
   // Print Player's hand
   let allhand = "";
   for(var i = 0; i < player.faceup.length; i++){
      allhand += player.faceup[i].value + " ";
   }
   console.log("Player's Face Up card:",allhand);

   // User Input
   var pInput = prompt("Play your Face Up card by inputting the index:");

   // If player can't play, add pile to their hand
   if(pInput == "None"){
      player.addPileToHand();
      return;
   }

   var pArr = pInput.split(','); // separate input into an array
   var check = true; // check if playable

   // Iterate through all input indexes and check if it's playable
   if(pArr.length > 1 || pArr[0] > player.faceup.length-1){
      console.log("Not a valid Index");
      playerTurn(player);
      return;
   }
   check = playable([player.faceup[pArr[0]]]);

   if (!check){
      console.log("Can't play with these cards");
      playerTurn(player);
      return;
   }
   // Play the cards
   var value = player.playCard(pArr[0], 1);
   if (value != -1) playPowerCard(value, player);

   // Grab card if deck is not empty
   player.takeFromDeck();
}

// Play Face Down ============================================
function playFaceDown(player){
   // User Input
   console.log("Face Down Card Remaining:", player.facedown.length);
   var pInput = prompt("Play your Face Down card by inputting the index:");
   var pArr = pInput.split(','); // separate input into an array
   var check = true; // check if playable

   // Iterate through all input indexes and check if it's playable
   if(pArr.length > 1 || pArr[0] > player.facedown.length-1){
      console.log("Not a valid Index");
      playerTurn(player);
      return;
   }
   check = playable([player.facedown[pArr[0]]]);

   // Play the cards
   var value = player.playCard(pArr[0], 2);
   if (value != -1) playPowerCard(value, player);
   if(!check){
      console.log(pArr[0].value, "cannot beat last card");
      player.addPileToHand();
   }

   // Grab card if deck is not empty
   player.takeFromDeck();

}

// Palace Choice =============================================
function playerTurn(player){
   console.log("Last card played:", pile[pile.length-1]);
   if (player.hand.length > 0){ // Play from hand
      playHand(player);
   } else
   if (player.faceup.length > 0) { // Play Face Up
      playFaceUp(player);
   } else
   if (player.facedown.length > 0) { // play face down
      playFaceDown(player);
   }
   player.status();
}

// Bomb Check and Play =======================================
function bombCheck(value){
   if (bomb.value == value){
      bomb.count += 1;
   } else{
      bomb.value = value;
      bomb.count = 0;
   }
   if (bomb.count >= 3){
      pile.length = 0;
      bomb.count = 0;
      bomb.value = -1;
   }
}

// User Experience ===========================================
function startGame() {
   setUp();
   // Canvas ----
   canvas.start();
   card = new component(50,35, "white", 10, 120);
   while(inProgress){
      console.log("Player 1 Turn");
      playerTurn(player1);
      console.log("Player 2 Turn");
      playerTurn(player2);
      console.log("Player 3 Turn");
      playerTurn(player3);
      console.log("Player 4 Turn");
      playerTurn(player4);
   }
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
