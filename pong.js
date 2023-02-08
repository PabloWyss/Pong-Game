// Getting reference to Canvas object
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');



// Setting dimensions of canvas
const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height
const RADIUS = 10
const PADLE_HEIGHT = 70
const PADLE_WIDTH = 15
const PADLE_1_DISTANCE_TO_EDGE = 10
const PADLE_2_DISTANCE_TO_EDGE = 10 + PADLE_WIDTH



function renderBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function renderBall(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();  
}

function renderPaddle1(y) {
  ctx.fillStyle = 'white';
  ctx.fillRect(PADLE_1_DISTANCE_TO_EDGE, y, PADLE_WIDTH, PADLE_HEIGHT)
}

function renderPaddle2 (y){
  ctx.fillStyle = "white";
  ctx.fillRect(CANVAS_WIDTH - PADLE_2_DISTANCE_TO_EDGE,y,PADLE_WIDTH,PADLE_HEIGHT)
}

function renderScoreRedPlayer1 (){
  ctx.fillStyle = "red";
  ctx.fillRect(0,0,CANVAS_WIDTH/2,CANVAS_HEIGHT)
}

function renderScoreRedPlayer2 (){
  ctx.fillStyle = "red";
  ctx.fillRect(CANVAS_WIDTH/2,0,CANVAS_WIDTH,CANVAS_HEIGHT)
}

function renderScore(score1,score2){
  ctx.font = "30px Arial"
  ctx.fillstyle = "white"
  ctx.textAlign = "center";
  ctx.fillText(score1+" : "+score2, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
}

function renderLine (){
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH/2,0);
  ctx.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.strokeStyle = "grey"
}

let ballX = 50
let ballY = 50
let vX = +1
let vY = +1
let paddle1Y = 10
let paddle2Y = 10
let scorePlayer1 = 0
let scorePlayer2 = 0

 let intervalID = setInterval(() => {
  renderBackground()
  renderBall(ballX, ballY)
  renderPaddle1(paddle1Y);
  renderPaddle2(paddle2Y)
  renderScore(scorePlayer1,scorePlayer2)
  renderLine()
  
  ballX += vX
  ballY += vY
  if (ballX + RADIUS == CANVAS_WIDTH) {
    renderScoreRedPlayer2 ()
    scorePlayer1 += 1
    vX = -vX
  }
  if (ballX - RADIUS == 0) {
    renderScoreRedPlayer1 ()
    scorePlayer2 += 1
    vX = -vX
  }
  if (ballY + RADIUS === CANVAS_HEIGHT){
    vY = -vY
  }
  if (ballY - RADIUS === 0) {
    vY = -vY
  }
  if (ballX + RADIUS === CANVAS_WIDTH - PADLE_2_DISTANCE_TO_EDGE && ballY > paddle2Y  && ballY < paddle2Y + PADLE_HEIGHT && vX > 0) {
     vX = -vX
   }
  if (ballX === PADLE_1_DISTANCE_TO_EDGE + PADLE_WIDTH + RADIUS  && ballY > paddle1Y  && ballY < paddle1Y + PADLE_HEIGHT && vX < 0)  {
    vX = -vX
  }
  if (scorePlayer1 === 3 || scorePlayer2 === 3){
    let winner = ""
    if (scorePlayer1 > scorePlayer2){
      winner = "Player 1"
    } else {
      winner = "Player 2"
    }
    ctx.font = "30px Arial"
    ctx.fillstyle = "white"
    ctx.textAlign = "center";
    renderBackground()
    renderBall(ballX, ballY)
    renderPaddle1(paddle1Y);
    renderPaddle2(paddle2Y)
    renderScore(scorePlayer1,scorePlayer2)
    renderLine()
    ctx.fillText(winner + " Wins!", CANVAS_WIDTH/2, 30);
    clearInterval(intervalID)
  }
}, 1)



document.addEventListener('keypress', (event) => {
  
  if (paddle1Y >0){
    if (event.key=== 'w') {
      paddle1Y -= 30
    }
  }
  if (paddle1Y < CANVAS_HEIGHT - PADLE_HEIGHT){
    if (event.key=== 's') {
      paddle1Y += 30
    }
  }
})

document.addEventListener('keypress', (event) => {
  
  if (paddle2Y >0){
    if (event.key=== 'o') {
      paddle2Y -= 30
    }
  }
  if (paddle2Y < CANVAS_HEIGHT - PADLE_HEIGHT){
    if (event.key=== 'l') {
      paddle2Y += 30
    }
  }
})

