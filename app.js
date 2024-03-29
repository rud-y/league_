import playGame from './game/playGame.js';

document.addEventListener('DOMContentLoaded', () => {

  // Main league table
  const leagueTable = {
      rows: []
  }

  const getTeamWithStatsRowInit = function(e) {
    const tableRow = {
      teamName: "",
      numOfMatches: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      points: 0
    }

    const myForm = document.getElementById('team-form');
    let teamValue = myForm.team.value;
    const validatedTeamName = teamValue.trim()
    document.getElementById('team').value = "";

    //data row in table
    const tr = document.createElement('tr');
    const dTeamName = document.createElement('td');

    if(validatedTeamName == '') {
      alert('You must type a name of a team!');
      return;
    }
    else if(leagueTable.rows.length == 0) {
      tableRow.teamName = validatedTeamName;
    }
    else {
      for(const team of leagueTable.rows){
        if(team.teamName == validatedTeamName) {
          alert('Sorry, this Team Name already exists! Enter a unique name!');
          return;
        } else {
          // orig. in after for loop with alert()
          tableRow.teamName = validatedTeamName;
        }
      };
    };

    tr.appendChild(dTeamName);
    dTeamName.textContent = tableRow.teamName;
    dTeamName.classList.add('table-team-name');


    const dNumOfMatches = document.createElement('td');
    tr.appendChild(dNumOfMatches);
    dNumOfMatches.textContent = tableRow.numOfMatches;
    //data
    const dWins = document.createElement('td');
    tr.appendChild(dWins);
    dWins.textContent = tableRow.wins;
    //data
    const dDraws = document.createElement('td');
    tr.appendChild(dDraws);
    dDraws.textContent = tableRow.draws;
    //data
    const dLosses = document.createElement('td');
    tr.appendChild(dLosses);
    dLosses.textContent = tableRow.losses;

    const dPoints = document.createElement('td');
    dPoints.textContent = tableRow.points;
    tr.appendChild(dPoints);


    const table = document.getElementById('table');
    const tbody = document.querySelector('tbody')
    tbody.appendChild(tr)
    // table.appendChild(tr);
    table.style.border = "solid 0.1rem black";
    table.classList.remove("hidden")
    table.classList.add("visible")
    document.getElementById('team').value = "";

    tableRow.id = Math.random().toFixed(5);
    tableRow.playedWith = [];
    leagueTable.rows.push(tableRow);
    console.log(tableRow);
  }

  // Submit new team
  document.getElementById('team-submit').onclick = (e) => {
    e.preventDefault();
    getTeamWithStatsRowInit();
  };

  const generateMatchesButton = document.getElementById('generate-matches-button');
  const fixtures = [];
  let matchesLeft =[];
  const allMatches = [];

  const fixturesContainer = document.getElementById('match-container');
  const savedMatches = new Set([]);

  const generatePossibleMatches = () => {
    const matches = leagueTable.rows.flatMap((t1, i) => leagueTable.rows.slice(i+1).map((t2) => {
      const newMatch = {};
      newMatch.team1 = t1.teamName;
      newMatch.team2 = t2.teamName;
      newMatch.score1 = 0;
      newMatch.score2 = 0;
      newMatch.overtime = false;
      allMatches.push(newMatch);

      console.log(newMatch.team1 + ' VS ' + newMatch.team2);
    }));
    generateMatchesButton.classList.add('hidden');
    document.getElementById('team').classList.add('hidden');
    document.getElementById('team-submit').classList.add('hidden');

    localStorage.setItem('savedMatches', JSON.stringify(allMatches));

    // Log matches from localstorage:
    let matchesFromLS = JSON.parse(localStorage.getItem('savedMatches'));
    console.log('LS MATCHES: ', matchesFromLS);

    return matches;
  };

//---------------------------------
  const generateFixtures = () => {
    const teamsPlayingThisWeek = [];
    generatePossibleMatches();
    console.log('ALL MATCHES::: ', allMatches);
    // const fixturesPassed = [];

    allMatches.forEach((match) => {
      if(!teamsPlayingThisWeek.includes(match.team1)) {
        teamsPlayingThisWeek.push(match.team1);
        teamsPlayingThisWeek.push(match.team2);
        fixtures.push(match);
      }
    });

    // allMatches.map(match => {
    //   if (teamsPlayingThisWeek.includes(match.team1)) {
    //     console.log(match.team1 + ' is already in This week fixtures!');
    //   } else {
    //     teamsPlayingThisWeek.push(match.team1);
    //     fixtures.push(match);
    //   }
    // });

    console.log('teamsPlayingThisWeek ARRAY: ' , teamsPlayingThisWeek);
    console.log('FIXTURES; ', fixtures);

    return fixtures;
  }

  //-------------------------
  // Create matches interface
  const createMatchesElements = () => {
    generateFixtures();
    console.log('ALL MATCHES AGAIN2: ' + allMatches);

    fixtures.map(match => {
      match.matchId = Math.random().toFixed(6);
      const matchElement = document.createElement('div');
      matchElement.classList.add('match-element');

      const playButton = document.createElement('button');
      playButton.innerHTML = 'Play game';
      playButton.classList.add('play-button');

      const homeTeam = document.createElement('p');
      homeTeam.classList.add('team-element1');
      const homeTeamScore = document.createElement('span');
      homeTeamScore.classList.add('score-element1');
      const awayTeam = document.createElement('p');
      awayTeam.classList.add('team-element2');
      const awayTeamScore = document.createElement('span');
      awayTeamScore.classList.add('score-element2');

      homeTeam.innerHTML = match.team1;
      homeTeamScore.innerHTML = '0';
      awayTeam.innerHTML = match.team2;
      awayTeamScore.innerHTML = '0';
      homeTeam.appendChild(homeTeamScore);
      awayTeam.appendChild(awayTeamScore);

      matchElement.appendChild(homeTeam);
      matchElement.appendChild(awayTeam);
      matchElement.appendChild(playButton);

      fixturesContainer.appendChild(matchElement);
      fixturesContainer.classList.remove('hidden');

    });

    const allGamesPlayButtons = document.querySelectorAll('.play-button');
    console.log(allGamesPlayButtons);
    if(allGamesPlayButtons) {
      allGamesPlayButtons.forEach((playButton) => {
        playButton.addEventListener('click', playGame);
      });
    };
  }

  generateMatchesButton.addEventListener('click', createMatchesElements);

});