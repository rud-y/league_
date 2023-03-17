//---START GAME--------

const playGame = (e) => {
  let period = '';
  let gameButton = e.target;
  console.log('rz gameButton: ', gameButton);
  if(!gameButton) {
    return;
  }

  let matchElement = gameButton.parentNode;
  // Match 2 score elements
  let score1 = matchElement.querySelector('.score-element1');
  let score2 = matchElement.querySelector('.score-element2');
  const team1 = matchElement.querySelector('.team-element1');
  const team2 = matchElement.querySelector('.team-element2');


  const playPeriod = () => {
    gameButton.disabled = false ? gameButton.disabled = true : gameButton.disabled = false;
    return setTimeout(() => {

      score1.insertAdjacentHTML('beforeend', `<span class="score-period-${period}">${(generateRandomScore(0, 4))}</span>`);
      score2.insertAdjacentHTML('beforeend', `<span class="score-period-${period}">${(generateRandomScore(0, 4))}</span>`);

      gameButton.innerHTML = `PLAY ${parseFloat(period)}. PERIOD `;
      gameButton.style.backgroundColor = 'rgb(245, 245, 245)';
      if(period === 4) {
        gameButton.innerHTML = 'Game Over!';
        gameButton.disabled = true;
      }
    }, 3000);
  };

  playPeriod();
  gameButton.innerHTML = 'Game IN PROGRESS';
  gameButton.style.backgroundColor = 'pink';
  period += 1;
};

  const generateRandomScore = (min, max) => {
    const result = Math.random() * (max - min) + min;
    return result.toFixed(0);
  };

export default playGame;