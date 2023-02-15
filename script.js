const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let noClicking = false;
let moves = 0;
let time = 0;

const NUMBERS = [
  1,2,3,4,5,6,7,8,
  1,2,3,4,5,6,7,8
];

/* 
// Game logic
*/

// uses Fisher Yates algorithm to return shuffled array
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// loops over array, creating a new div with class equal to number value
// adds click event listener to each div
function createDivsForNumbers(numberArray) {
  for (let number of numberArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(number);
    newDiv.classList.add('flex');
    newDiv.classList.add('game__area-item');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// click on card one, store the class name of that card
// repeat for card two
// if cardOneColor === cardTwoColor, remove EventListener on both cards
function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;

  let currentCard = event.target;

  currentCard.classList.add('flipped');
  currentCard.innerText = currentCard.classList[0];

  if (!cardOne || !cardTwo) {
    currentCard.classList.add('flipped');
    currentCard.style.backgroundColor = 'orange';

    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
  }

  if (cardOne && cardTwo) {
    noClicking = true;

    moves ++;
    playerMoves.textContent = moves;

    let numberOne = cardOne.classList[0];
    let numberTwo = cardTwo.classList[0];
    // console.log(numberOne, numberTwo);

    if (numberOne === numberTwo) {
      console.log('A match!');
      cardsFlipped += 2;

      cardOne.style.backgroundColor = 'var(--clr-blue-400)';
      cardTwo.style.backgroundColor = 'var(--clr-blue-400)';

      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);

      cardOne = null;
      cardTwo = null;

      noClicking = false;

    } else {
      setTimeout(() => {
        cardOne.innerText = "";
        cardTwo.innerText = "";

        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");

        cardOne.style.backgroundColor = 'var(--clr-blue-800)';
        cardTwo.style.backgroundColor = 'var(--clr-blue-800)';

        cardOne = null;
        cardTwo = null;
        noClicking = false;

      }, 1000);
    }
  }

  if (cardsFlipped === NUMBERS.length) {
    // end game modal
    const endGame = document.getElementById("end");
    endGame.setAttribute("data-visible", true);
    body.classList.add('dark-background'); 

    // player time and moves logic 
    const endMoves = document.getElementById("game-end__moves");
    endMoves.textContent = moves + ' Moves';
  };
}

/* 
// Mobile menu logic
*/

// mobile menu
const openMenuButton = document.getElementById("button__menu");
const resumeButton = document.getElementById("button__resume");
const restartButton = document.getElementById("button__restart");
const newGameButton = document.getElementById("button__new-game")
const modalContainer = document.getElementById("modal-container");
const body = document.querySelector('body');

// when the menu button is clicked 
openMenuButton.addEventListener("click", () => {
  const visibility = modalContainer.getAttribute("data-visible");

  // if the menu is closed, open it 
  if (visibility === "false") {
      modalContainer.setAttribute("data-visible", true);
      body.classList.add('dark-background');
  } 
})

// when the resume button is clicked 
resumeButton.addEventListener("click", () => {
  const visibility = modalContainer.getAttribute("data-visible");

  // if the menu is open, close it 
  if (visibility === "true") {
      modalContainer.setAttribute("data-visible", false);
      body.classList.remove('blurred-background');
  } 
})

// when the new game button is clicked 
newGameButton.addEventListener("click", () => {
  cardOne = null;
  cardTwo = null;
  cardsFlipped = 0;
  noClicking = false;
  moves = 0;
  time = 0;

  let shuffledNumbers = shuffle(NUMBERS);
  createDivsForNumbers(shuffledNumbers);
})

// when the restart button is clicked 
restartButton.addEventListener("click", () => {
  cardOne = null;
  cardTwo = null;
  cardsFlipped = 0;
  noClicking = false;
  moves = 0;
  time = 0;
})

/* 
// Player time and number of moves logic
*/

const playerMoves = document.getElementById("player__moves-dynamic");
playerMoves.textContent = moves;

const playerTime = document.getElementById("player__time-dynamic");

// updates the clock every second
setInterval(() => {
  // increments the time by one second
  time++;

  // calculates the minutes and seconds
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  // formats the time as MM:SS
  const formattedTime = `${minutes}:${seconds}`;

  // updates the clock display with the formatted time
  playerTime.textContent = formattedTime;
}, 1000);


// when the DOM loads
let shuffledNumbers = shuffle(NUMBERS);
createDivsForNumbers(shuffledNumbers);
