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
  const playerTime = document.getElementById("player__time-dynamic");

  playerScore.textContent = currentScore;

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

  function createDivsForNumbers(numberArray) {

    for (let number of numberArray) {
      const newDiv = document.createElement("div");

      newDiv.classList.add(number);
      newDiv.classList.add('flex');
      newDiv.classList.add('game__area-item');
      newDiv.addEventListener("click", handleCardClick);

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
  // Buttons logic (inc. mobile menu logic)
  */

  const openMenuButton = document.getElementById("button__menu");
  const resumeButton = document.getElementById("button__resume");
  const restartButtons = document.querySelectorAll("#button__restart");
  const newGameButtons = document.querySelectorAll("#button__new-game")
  const menuModal = document.getElementById("menu");
  const endModal = document.getElementById("end");

  // when mobile menu button is clicked 
  openMenuButton.addEventListener("click", () => {
    stopTimer();

    menuModal.setAttribute("data-visible", true);
    body.classList.add('dark-background');
  })

  // when mobile resume button is clicked 
  resumeButton.addEventListener("click", () => {
    startTimer();

    menuModal.setAttribute("data-visible", false);
    body.classList.remove('dark-background');
  })

  // when new game buttons are clicked
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

  // when restart buttons are clicked
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
