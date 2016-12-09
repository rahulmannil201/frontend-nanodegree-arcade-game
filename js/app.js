// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 70;
    this.speed= 150;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed *dt;
    if (this.x > 490) {
            this.x = 0;
        }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
 var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed =90;
    this.width = 75;
    this.height = 85;

    this.sprite = 'images/char-boy.png';

 };

 Player.prototype.update = function(dt) {

   if (this.x < 0 || this.x > 400){
        if(this.x<0){
            this.x = 0;
        }
        else{
            this.x = 400;
        }
    }

   if(this.y < 0 || this.y > 400){
        if(this.y < 0) {
            this.reset();
        }
        else{
            this.y = 400;
        }
    }

   this.checkCollisions();
 };

 Player.prototype.reset = function() {
    this.y = 400;
    this.x = 0;
    console.log("reset");
   //etTimeout (function() {
     //     alert('YOU LOSE!');
      //    }, 100);
 }

Player.prototype.checkCollisions = function() {

    for (var i = 0; i < allEnemies.length; i++) {
        if ((player.x < allEnemies[i].x + allEnemies[i].width) && (player.x + player.width > allEnemies[i].x) && (player.y < allEnemies[i].y + allEnemies[i].height) && (player.height + player.y > allEnemies[i].y)) {
            console.log("Collision!");

            this.reset();
        }
       /*   else
        {
           console.log("win");
           //etTimeout (function() {
           //lert('YOU WIN!');
           //, 100);
            this.reset();
       } */
    }
};


 Player.prototype.handleInput = function(direction) {

    if(direction ==='left'&& this.x > 25){
        this.x -= 100;
    }
    if(direction ==='up'&& this.y >50){
        this.y -= 100;

    }

    if(direction ==='right'&& this.x < 400){
        this.x += 100;
    }



    if(direction ==='down'&& this.y<410){
        this.y += 100;

    }

};

 Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,50);
var enemy2 = new Enemy(0,150);
var enemy3 = new Enemy(0,250);
var allEnemies = [enemy1,enemy2,enemy3];
var player = new Player(0,400);

// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
