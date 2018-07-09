// Enemies our player must avoid
let tileWidth = 76;
let tileHeight = 25;
let score = 0;
let clickCounter = 0;
let playerSprite = 'images/char-boy.png';
const enemySprite = 'images/enemy-bug.png'
const players = document.getElementById("players");
const allPlayer = document.getElementsByClassName("playerList");
let timer = document.querySelector("#timer");
let sec = 0;
let min = 0;
let timerInterval;
let scoreContainer = document.querySelector("#score");
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
    scoreContainer.textContent = score;
    if(this.y <= 0) {
      this.y = 320;
      score += 5;
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
    if(keyCode === 'up' || keyCode === 'down'|| keyCode === 'right' || keyCode === 'left'){
      clickCounter++;
      if(clickCounter===1){
        console.log(clickCounter);
        arcadeFeatures.startTimer();
      }
    }
  }
}

class ArcadeFeatures {
  constructor(){}
  addEnemies(){
    const enemiesX = [0, 0, 0];
    const enemiesY = [35, 90, 150];
    for(var i=0; i <= enemiesX.length; i++){
      allEnemies.push(new Enemy(enemiesX[i], enemiesY[i]));
    }
  }
  startTimer(){
    timerInterval = setInterval(function(){
      sec++;
      if(sec >= 60){
        sec = 0;
        min++;
      }
      timer.innerHTML = `${min} min & ${sec} sec`;
    },1000);
  }
  resetTimer(){
    clearInterval(timerInterval);
    timer.textContent = "0 min & 0 sec";
    sec = 0;
    min = 0;
  }
  reset(){
    allEnemies = [];
    this.addEnemies();
    clickCounter = 0;
    this.resetTimer();
    player.x = 141;
    player.y = 305;
    score = 0;
  }
}

let allEnemies = [];
let player = new Player();
const arcadeFeatures = new ArcadeFeatures();
arcadeFeatures.addEnemies();
timer.textContent = "0 min & 0 sec";

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
  playerlist.classList.remove("selected");
  playerlist.addEventListener("click", function(e){
    playerSprite = e.target.getAttribute('src');
    player.sprite = playerSprite;
    playerlist.classList.add("selected");
    playerlist.previousElementSibling.classList.remove("selected");
    playerlist.nextElementSibling.classList.remove("selected");
  });
});


