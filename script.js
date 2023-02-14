const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let noClicking = false;
let moves = 0;


let styles = getComputedStyle(document.documentElement);
var colorOrange= styles.getPropertyValue('--clr-orange');
var colorLightBlue= styles.getPropertyValue('--clr-blue-800');

let c = document.documentElement.style.getPropertyValue('--myVariable');


const NUMBERS = [
  1,2,3,4,5,6,7,8,
  1,2,3,4,5,6,7,8
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
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


let shuffledNumbers = shuffle(NUMBERS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForNumbers(numberArray) {
  for (let number of numberArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(number);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// click on card one, store the class name of that card
// click on card two, store the class name of that card 
// if cardOneColor == cardTwoColor, remove EventListener on both cards


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
    moves +=1;

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

  if (cardsFlipped === NUMBERS.length) alert("game over!");
}


// when the DOM loads
createDivsForNumbers(shuffledNumbers);
