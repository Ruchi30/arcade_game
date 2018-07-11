// all global variables
let tileWidth = 76;
let tileHeight = 25;
let score = 0;
let value = 0;
let lifeVal = 0;
let clickCounter = 0;
let sec = 0;
let min = 0;
let timerInterval;
let playerSprite = 'images/char-boy.png';
const enemySprite = 'images/enemy-bug.png';
const gemSprite = ['Gem-Blue', 'Gem-Green','Gem-Orange', 'Star'];
const lifeSprite = 'images/Heart.png';
//html selector variables
const players = document.querySelector(".players");
let timer = document.querySelector(".timer");
const btnMobile = document.querySelector(".btnMobile");
let scoreContainer = document.querySelector(".score");
let lifeContainer = document.querySelector(".life");
let refresh = document.querySelector(".restart");
let btnPlay = document.querySelector(".btnPlay");
const allPlayer = document.getElementsByClassName("playerList");
let playerlists = [...allPlayer];
const stars = document.querySelectorAll(".fa-star");

//@description: common class for player, enemy, gem and life
class arcade{
  //@constructor: common constructor for player, enemy, gem and life
  constructor(x, y, spriteImg){
    this.y = y;
    this.x = x;
    this.sprite = spriteImg;
  }
  //@description: common function for drawing canvas for player, enemy, gem and life
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//@description: class for enemy
class Enemy extends arcade{
  //@constructor:constructor for enemy
  constructor(x, y, spriteImg){
    super(x = 0, y, spriteImg = enemySprite);
    this.random = Math.floor(Math.random() * 3) + 1;
  }
  //@description: function for updating the enemy position
  update(dt) {
    this.x = Math.round(this.x + (this.random + 1 * dt));
    if(this.x > 454) {
        this.x = 0;
        this.random = Math.floor(Math.random() * 3) + 1;
    }
  }
  //@description: function for checking the collision between player and enemy
  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      if(lifeVal > 0){
        this.x = 0;
        lifeVal--;
      }
      else {
        arcadeFeatures.reset();
      }
    }
  }
}

//@description: class for player
class Player extends arcade{
  //@constructor:constructor for player
  constructor(x, y, spriteImg){
    super(x = 152, y = 308, spriteImg = playerSprite);
    console.log(this.sprite);
  }
  //@description: function for all updates of player
  update(dt) {
    if(this.y <= 0) {
      this.y = 320;
      score += 5;
    }
    arcadeFeatures.scoreDisplay();
    arcadeFeatures.starRating();
    arcadeFeatures.lifeDisplay();
  }
  //@description: function for moving the player
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
      arcadeFeatures.startGame()
    }
  }
}

//@description: class for gem
class Gem extends arcade{
  //@constructor:constructor for gem
  constructor(x, y, spriteImg){
    super(x = tileWidth * Math.floor(Math.random() * 4), y = tileHeight * Math.floor(Math.random() * 6), spriteImg = `images/${gemSprite[value]}.png`);
    this.random = Math.floor(Math.random() * 3) + 1;
  }
  //@description: function for updating the player score after gem collection and changing gem position
  update() {
    if(score <= 10) {
      value = 1;
    }
    else if(score > 10 && score <= 20) {
      value = 2;
    }
    else if(score > 20 && score <= 30) {
      value = 3;
    }
    else if(score > 10 && score <= 40) {
      value = 4;
    }
    this.x = tileWidth * Math.floor(Math.random() * 4);
    this.y = tileHeight * Math.floor(Math.random() * 5);
    this.sprite = `images/${gemSprite[value]}.png`
  }
  //@description: function for checking the collision between player and gem
  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      this.update();
      score += (value + 1)*5;
    }
  }
}

//@description: class for gem
class Life extends arcade{
  //@constructor:constructor for gem
  constructor(x, y, spriteImg){
    super(x = tileWidth * Math.floor(Math.random() * 4), y = tileHeight * Math.floor(Math.random() * 6), spriteImg = lifeSprite);
    this.random = Math.floor(Math.random() * 3) + 10;
  }
  //@description: function for updating the player life after life collection and changing life position
  update() {
    this.x = tileWidth * Math.floor(Math.random() * 4);
    this.y = tileHeight * Math.floor(Math.random() * 5);
  }
  //@description: function for checking the collision between player and life
  checkCollisions(){
    let xPos = player.x >= this.x  -50 && player.x <= this.x + 50;
    let yPos = player.y >= this.y  -20 && player.y <= this.y + 20;
    if(xPos && yPos){
      this.update();
      if(lifeVal < 3){
        lifeVal++;
      }
    }
  }
}

//@description: class for arcade game other features
class ArcadeFeatures {
  constructor(){}
  //@description: function for adding the enemies
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
  //@description: function for starting the timer
  startTimer(){
    timerInterval = setInterval(function(){
      sec++;
      if(sec >= 60){
        sec = 0;
        min++;
      }
      timer.innerHTML = `${min} Min & ${sec} Sec`;
    },1000);
  }
  //@description: function for stopping the timer
  stopTimer(){
    clearInterval(timerInterval);
  }
  //@description: function for timer reset
  resetTimer(){
    clearInterval(timerInterval);
    timer.textContent = "0 Min & 0 Sec";
    sec = 0;
    min = 0;
  }
  //@description: function for rating the player
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
  //@description: function for displaying the player life
  lifeDisplay() {
    lifeContainer.textContent = lifeVal;
  }
  //@description: function for displaying the player score
  scoreDisplay() {
    scoreContainer.textContent = score;
  }
  ////@description: function for Detecting a mobile browser
  //Source : https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  isMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
  //@description: function for hiding the mobile control buttons
  hideMobileControl(){
    if(arcadeFeatures.isMobile()){
      btnMobile.classList.toggle("hidden");
    }
  }
  //@description: function for game pause
  stopGame(){
    if(btnPlay.classList.contains("fa-play-circle")){
      if(clickCounter > 0){
        arcadeFeatures.startTimer();
      }
    btnPlay.classList.toggle('fa-pause-circle');
    btnPlay.classList.toggle('fa-play-circle');
    }
    else {
      arcadeFeatures.stopTimer();
      btnPlay.classList.toggle('fa-play-circle');
      btnPlay.classList.toggle('fa-pause-circle');
    }
  }
  //@description: function for starting the game on player movement
  startGame(){
    if(btnPlay.classList.contains("fa-play-circle") && clickCounter > 0){
      arcadeFeatures.startTimer();
      btnPlay.classList.toggle('fa-pause-circle');
      btnPlay.classList.toggle('fa-play-circle');
    }
  }
  //@description: function for game restart
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
// initialize all the objects
let allEnemies = [];
let player = new Player();
let gem = new Gem();
let life = new Life();
const arcadeFeatures = new ArcadeFeatures();
arcadeFeatures.addEnemies();
arcadeFeatures.hideMobileControl();
//@description: function for selecting the keys
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//@description: function for selecting the player from player list
playerlists.forEach(function(playerlist) {
  playerlist.addEventListener("click", function(){
    let selectedPlayer = document.querySelector(".selected")
    playerSprite =  `images/${this.type}.png`;
    player.sprite = playerSprite;
    selectedPlayer.classList.remove("selected");
    playerlist.classList.add("selected");
  });
});
//@description: function for restarting the game on restart button click
refresh.addEventListener("click",function(){
  arcadeFeatures.reset();
});
//@description: function for play and pause the game
btnPlay.addEventListener("click",arcadeFeatures.stopGame);
//@description: function for adding events on mobile button click
btnMobile.addEventListener("click",function(e){
  if (e.target.classList.contains("up")) {
    player.handleInput("up");
  }
  if (e.target.classList.contains("down")) {
    player.handleInput("down");
  }
  if (e.target.classList.contains("left")) {
    player.handleInput("left");
  }
  if (e.target.classList.contains("right")) {
    player.handleInput("right");
  }
});


