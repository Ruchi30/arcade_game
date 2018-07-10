// Enemies our player must avoid
let tileWidth = 76;
let tileHeight = 25;
let score = 0;
let value = 0;
let lifeVal = 0;
let clickCounter = 0;
let playerSprite = 'images/char-boy.png';
const enemySprite = 'images/enemy-bug.png';
const gemSprite = ['Gem Blue', 'Gem Green','Gem Orange', 'Star'];
const lifeSprite = 'images/Heart.png';
const players = document.querySelector(".players");
const allPlayer = document.getElementsByClassName("playerList");
let timer = document.querySelector(".timer");
let sec = 0;
let min = 0;
let timerInterval;
let scoreContainer = document.querySelector(".score");
let lifeContainer = document.querySelector(".life");
let playerlists = [...allPlayer];
//Array for Star Rating
const stars = document.querySelectorAll(".fa-star");



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
      score += 1;
    }
    arcadeFeatures.scoreDisplay();
    arcadeFeatures.starRating();
    arcadeFeatures.lifeDisplay();
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
        arcadeFeatures.startTimer();
      }
    }
  }
}

class Gem extends arcade{
  constructor(x, y, spriteImg){
    super(x = tileWidth * Math.floor(Math.random() * 4), y = tileHeight * Math.floor(Math.random() * 6), spriteImg = `images/${gemSprite[value]}.png`);
    this.random = Math.floor(Math.random() * 3) + 1;
  }

  update() {
    switch(score){
      case 10:
        value++;
        break;
      case 25:
        value++;
        break;
      case 50:
        value++;
    }
    this.x = tileWidth * Math.floor(Math.random() * 4);
    this.y = tileHeight * Math.floor(Math.random() * 5);
    this.sprite = `images/${gemSprite[value]}.png`
  }
  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      this.update();
      score += value + 1;
    }
  }
}

class Life extends arcade{
  constructor(x, y, spriteImg){
    super(x = tileWidth * Math.floor(Math.random() * 4), y = tileHeight * Math.floor(Math.random() * 6), spriteImg = lifeSprite);
    this.random = Math.floor(Math.random() * 3) + 1;
  }

  update() {
    this.x = tileWidth * Math.floor(Math.random() * 4);
    this.y = tileHeight * Math.floor(Math.random() * 5);
  }
  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      this.update();
      lifeVal++;
    }
  }
}


class ArcadeFeatures {
  constructor(){}
  addEnemies(){
    let enemiesX = [];
    let enemiesY = [];
    if(score <= 5){
      enemiesX = [0, 0, 0];
      enemiesY = [35, 90, 150];
    }
    else if(score > 5 && score <= 15){
      enemiesX = [0, 0, 0, 0, 0];
      enemiesY = [35, 66, 97, 128, 159];
    }
    else if(score > 15){
      enemiesX = [0, 0, 0, 0, 0, 0, 0];
      enemiesY = [35, 57, 79, 101, 123, 140, 157];
    }
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
      timer.innerHTML = `${min} Minu & ${sec} Sec`;
    },1000);
  }
  resetTimer(){
    clearInterval(timerInterval);
    timer.textContent = "0 Min & 0 Sec";
    sec = 0;
    min = 0;
  }
  starRating(){
    let count = (min*60 + sec) / score;
    if(count > -1 && count < 5){
      for(let i= 0; i < 3; i++){
        if(i >= 0){
          stars[i].classList.add("active");
        }
      }
    }
    else if(count >= 5 && count < 15 ){
      for(let i= 0; i < 3; i++){
        if(i > 0){
          stars[i].classList.add("active");
        }
        else {
          stars[i].classList.remove("active");
        }
      }
    }
    else if(count <= 15){
      for(let i= 0; i < 3; i++){
        if(i > 1){
          stars[i].classList.add("active");
        }
        else {
          stars[i].classList.remove("active");
        }
      }
    }
  }
  lifeDisplay(){
    lifeContainer.textContent = lifeVal;
  }
  scoreDisplay(){
    scoreContainer.textContent = score;
  }
  reset(){
    allEnemies = [];
    this.addEnemies();
    clickCounter = 0;
    this.resetTimer();
    player.x = 141;
    player.y = 305;
    score = 0;
    value = 0;
    lifeVal = 0;
    for(const star of stars){
      if(star.classList.contains("active")){
        star.classList.remove("active");
      }
    }
  }
}

let allEnemies = [];
let player = new Player();
let gem = new Gem();
let life = new Life();
const arcadeFeatures = new ArcadeFeatures();
arcadeFeatures.addEnemies();

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


