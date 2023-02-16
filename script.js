document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("game");
  const body = document.querySelector('body');
  let cardOne = null;
  let cardTwo = null;
  let cardsFlipped = 0;
  let noClicking = false;
  let currentScore = 0;
  let elapsedTime = 0;
  let formattedTime;
  let intervalId;
  // let timerIsRunning = true;

  const NUMBERS = [
    1,2,3,4,5,6,7,8,
    1,2,3,4,5,6,7,8
  ];

  /* 
  // Player time and number of moves logic
  */

  const playerScore = document.getElementById("player__moves-dynamic");
  playerScore.textContent = currentScore;

  const playerTime = document.getElementById("player__time-dynamic");

  function startTimer() {
    intervalId = setInterval(() => {
    elapsedTime++;

    // calculates the minutes and seconds
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(1, "0");
    const seconds = (elapsedTime % 60).toString().padStart(2, "0");

    // formats the time as MM:SS
    formattedTime = `${minutes}:${seconds}`;

    // updates the clock display with the formatted time
    playerTime.textContent = formattedTime;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
  }

  function restartTimer() {
    stopTimer();
    elapsedTime = 0;
    startTimer();
  }

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

  function removeDivsForNumbers() {
    let numDivs = document.querySelectorAll('.game__area-item');

    for (let div of numDivs) {
      div.remove();
    }
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("player__moves-dynamic").innerText = currentScore;
  }

  // click on card one, store the class name of that card
  // repeat for card two
  // if cardOneColor === cardTwoColor, remove EventListener on both cards
  function handleCardClick(event) {
    if (noClicking) return;
    if (event.target.classList.contains('flipped')) return;

    let currentCard = event.target;
    let playerScore = document.getElementById('player__moves-dynamic');

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

      currentScore ++;
      playerScore.textContent = currentScore;

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

          cardOne.removeAttribute('style');
          cardTwo.removeAttribute('style');

          cardOne = null;
          cardTwo = null;
          noClicking = false;

        }, 1000);
      }
    }

    if (cardsFlipped === NUMBERS.length) {
      // end game modal
      stopTimer();
      const endGame = document.getElementById("end");
      endGame.setAttribute("data-visible", true);
      body.classList.add('dark-background');

      const playerTime = document.getElementById("game-end__time");
      playerTime.textContent = formattedTime;

      // player time and moves logic 
      const endMoves = document.getElementById("game-end__moves");
      endMoves.textContent = currentScore + ' Moves';
    };
  }

  /* 
  // Button logic (resume, restart, & new game)
  */

  // mobile menu
  const openMenuButton = document.getElementById("button__menu");
  const resumeButton = document.getElementById("button__resume");
  const restartButtons = document.querySelectorAll("#button__restart");
  const newGameButtons = document.querySelectorAll("#button__new-game")
  const menuModal = document.getElementById("menu");
  const endModal = document.getElementById("end");

  // when the menu button is clicked 
  openMenuButton.addEventListener("click", () => {
    stopTimer();

    // if the menu is closed, open it 
    menuModal.setAttribute("data-visible", true);
    body.classList.add('dark-background');
  })

  // when the resume button is clicked 
  resumeButton.addEventListener("click", () => {
    startTimer();
    // if the menu is open, close it 
    menuModal.setAttribute("data-visible", false);
    body.classList.remove('dark-background');
  })

  for (let button of newGameButtons) {
    button.addEventListener("click", () => {
      cardOne = null;
      cardTwo = null;
      cardsFlipped = 0;
      noClicking = false;
      elapsedTime = 0;

      setScore(0);

      menuModal.setAttribute("data-visible", false);
      endModal.setAttribute("data-visible", false);
      body.classList.remove('dark-background');
      removeDivsForNumbers();
      let shuffledNumbers = shuffle(NUMBERS);
      createDivsForNumbers(shuffledNumbers);
      restartTimer();
    });
  }

  for (let button of restartButtons) {
    button.addEventListener("click", () => {
      cardOne = null;
      cardTwo = null;
      cardsFlipped = 0;
      noClicking = false;
      elapsedTime = 0;
      setScore(0);

      const numDivs = document.querySelectorAll('.game__area-item');

      for (let div of numDivs) {
        if (div.classList.contains('flipped')) {
          div.classList.remove('flipped');
          div.textContent='';
          div.removeAttribute('style');
          div.addEventListener('click', handleCardClick);
        }
      }

      body.classList.remove('dark-background');
      menuModal.setAttribute('data-visible', false);
      endModal.setAttribute("data-visible", false);
      restartTimer();
    });
  }

  // when the DOM loads
  let shuffledNumbers = shuffle(NUMBERS);
  createDivsForNumbers(shuffledNumbers);
  startTimer();
})
