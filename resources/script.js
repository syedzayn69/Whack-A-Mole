const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min,max){
  return Math.floor(Math.random() * (max - min) + min)
}

function randomHole(holes){
  let rndIndex = Math.floor(holes.length * Math.random())
  let hole = holes[rndIndex]

  if(lastHole === hole){
    console.log('Oops! Hole Repeted')
    return randomHole(holes)
  }

  lastHole = hole
  return hole
}

function popUp(){
  let time = randomTime(500,1000)
  let hole = randomHole(holes)
  hole.classList.add('up')

  setTimeout(()=> {
    hole.classList.remove('up')
    if(!timeUp) popUp()  // IF TIME IS NOT UP(timeUp = false) KEEP RUNNING
  },time);  
}

function startGame(){
  scoreBoard.textContent = 0
  timeUp = false
  score = 0
  popUp()
  setTimeout(() => timeUp = true,10000)
}

function bonk(e){
  if(!e.isTrusted) return  // USER WONT WE ABLE TO CHEAT WITH FAKE CLICKS
  score++
  this.parentNode.classList.remove('up')
  scoreBoard.textContent = score;

}

moles.forEach(mole => mole.addEventListener('click',bonk))
