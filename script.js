'use strict';
// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const cur0 = document.getElementById('current--0');
const cur1 = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const innit = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  cur0.textContent = 0;
  cur1.textContent = 0;
  diceEle.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
innit();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    // display the dice
    diceEle.classList.remove('hidden');
    // generating random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    //   console.log(dice);
    //display dice roll
    diceEle.src = `dice-${dice}.png`;
    // if it's a one
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // cur0.textContent = currentScore;
    } else {
      // Switcching players
      switchPlayer();
    }
  }
});

// User holds score
holdBtn.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player scores
    scores[activePlayer] += currentScore;
    // score[1] = score[1] + currentScore;
    // currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // checks if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // finish the game
      playing = false;
      diceEle.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

//when the player resets the game
newBtn.addEventListener('click', innit);
