// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //intializing position,speed and images to enemy function
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 70;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
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
//Player class
//updating speed,location,width and height of player function
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 85;


    this.sprite = 'images/char-boy.png';

};

//checking boundary conditions
//ensuring player cant move offscreen
//update function
//resetting the game when player wins and display U win
//also checking whether there is a chance of collision
Player.prototype.update = function(dt) {



    if (this.x < 0 || this.x > 400) {
        if (this.x < 0) {
            this.x = 0;

        } else {
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {

        if (this.y < 0) {
           this.y=0;

        } else {
            this.y = 400;
        }
    }




    this.checkCollisions();
};

//reset the player back to intial position
//reset function
Player.prototype.reset = function() {
    this.y = 400;
    this.x = 0;

    console.log("reset");

};


//collision checking function
//comparing the player location,width and height with enemy and checks whether there is a chance for collision
//reset if there is collision
Player.prototype.checkCollisions = function() {

    for (var i = 0; i < allEnemies.length; i++) {
        if ((player.x < allEnemies[i].x + allEnemies[i].width) && (player.x + player.width > allEnemies[i].x) && (player.y < allEnemies[i].y + allEnemies[i].height) && (player.height + player.y > allEnemies[i].y)) {
            console.log("Collision!");

            this.reset();
        }

    }
};

//function for moving player
//make sure player can move around without moving offscreen
Player.prototype.handleInput = function(direction) {

    if (direction === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y >= 0) {
        this.y -= 100;



    }

    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }



    if (direction === 'down' && this.y < 400) {
        this.y += 100;

    }

};

//drawing the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y <= 0)


    {



         alert("U WIN");
         this.reset();



    }

};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//enemy objects
var enemy1 = new Enemy(-100, 90, 150);
var enemy2 = new Enemy(-150, 180, 200);
var enemy3 = new Enemy(-100, 290, 225);
var allEnemies = [enemy1, enemy2, enemy3];
//player object
var player = new Player(0, 400);

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