//---START GAME--------
const playGame = (e) => {
    let gameButton = e.target;
    const matchElement = e.target.parentNode;
    let score1 = matchElement.querySelector('.score-element1');
    let score2 = matchElement.querySelector('.score-element2');
    const team1 = matchElement.querySelector('.team-element1');
    const team2 = matchElement.querySelector('.team-element2');

    gameButton.innerHTML = '1.PERIOD IN PROGRESS';
    setTimeout(() => {
      score1.innerHTML = generateRandomScore(0, 3);
      score2.innerHTML = generateRandomScore(0, 3);
      console.log(team1.innerText + score1.innerHTML);
      console.log(team2.innerText + score2.innerHTML);
      gameButton.innerHTML = 'END OF 1.PERIOD';
    }, 3000);

  };

  const generateRandomScore = (min, max) => {
    const result = Math.random() * (max - min) + min;
    return result.toFixed(0);
  };

export default playGame;