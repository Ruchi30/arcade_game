// Enemies our player must avoid
let tileWidth = 76;
let tileHeight = 25;
let playerSprite = 'images/char-boy.png';
const enemySprite = 'images/enemy-bug.png'
const players = document.getElementById("players");
const allPlayer = document.getElementsByClassName("playerList");
let playerlists = [...allPlayer];



class arcade{
  constructor(x, y, spriteImg){
    this.y = y;
    this.x = x;
    this.sprite = spriteImg;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends arcade{
  constructor(x, y, spriteImg){
    super(x = 0, y, spriteImg = enemySprite);
    this.random = Math.floor(Math.random() * 3) + 1;
  }

  update(dt) {
    this.x = Math.round(this.x + (this.random + 1 * dt));
    if(this.x > 454) {
        this.x = 0;
        this.random = Math.floor(Math.random() * 3) + 1;
    }
  }

  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      arcadeFeatures.reset();
    }
  }
}

class Player extends arcade{
  constructor(x, y, spriteImg){
    super(x = 140, y = 308, spriteImg = playerSprite);
    console.log(this.sprite);
  }

  update(dt) {
    if(this.y <= 0) {
        this.y = 320;
    }
  }

  handleInput(keyCode) {
    if(keyCode === 'up' && this.y > 0) {
      this.y = this.y - tileHeight;
    }
    if(keyCode === 'down' && this.y < 280) {
      this.y = this.y + tileHeight;
    }
    if(keyCode === 'right' && this.x < 280) {
      this.x = this.x + tileWidth;
    }
    if(keyCode === 'left' && this.x > 0) {
      this.x = this.x - tileWidth;
    }
  }
}

class ArcadeFeatures {
  constructor(){}
  addEnemies(){
    const enemiesX = [0, 0, 0, -30, -50, -80];
    const enemiesY = [35, 90, 150, 45, 75, 120];
    for(var i=0; i <= enemiesX.length; i++){
      allEnemies.push(new Enemy(enemiesX[i], enemiesY[i]));
      console.log(allEnemies);
    }
  }
  reset(){
    allEnemies = [];
    this.addEnemies();
    player.x = 141;
    player.y = 305;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [];
// Place the player object in a variable called player
let player = new Player();
const arcadeFeatures = new ArcadeFeatures();
arcadeFeatures.addEnemies();
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

playerlists.forEach(function(playerlist) {
  //playerlist.removeClass("selected");
  playerlist.addEventListener("click", function(e){
    playerSprite = e.target.getAttribute('src');
    player.sprite = playerSprite;
    playerlist.addClass("selected");
    //players.style.display="none";
  });
});
