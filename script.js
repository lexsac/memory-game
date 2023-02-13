const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let noClicking = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
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


let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

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
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo) {
    currentCard.classList.add('flipped');
    cardOne = cardOne || currentCard;
    cardTwo = currentCard === cardOne ? null : currentCard;
    // console.log(cardOne, cardTwo);
  }

  if (cardOne && cardTwo) {
    noClicking = true;

    let colorOne = cardOne.classList[0];
    let colorTwo = cardTwo.classList[0];
    console.log(colorOne, colorTwo);

    if (colorOne === colorTwo) {
      console.log('A match!');
      cardsFlipped += 2;

      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);

      cardOne = null;
      cardTwo = null;

      noClicking = false;

    } else {
      setTimeout(() => {
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";

        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");

        cardOne = null;
        cardTwo = null;
        noClicking = false;

      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
}


// when the DOM loads
createDivsForColors(shuffledColors);
