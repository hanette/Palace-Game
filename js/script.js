"use strict";

var card;
// Card Creation ============================================
var suits = ["spades", "clubs", "diamonds", "hearts"];
var deck = [];

// Go through each suit and create one of each card
suits.forEach(function(suit){
   for(var i = 1; i < 14; i++){
      deck.push({
         suit: suit,
         value: i,
         hidden: false
      });
   };
});

console.log(deck); // DEBUG: print entire deck
// Card shuffle =============================================

// User Experience ===========================================
function startGame() {
    canvas.start();
    card = new component(50,35, "white", 10, 120);
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
