document.addEventListener('DOMContentLoaded', ()=> {
  // Main league table
  const leagueTable = {
      rows: []
  }
  // Round of matches
  const matchRound = [];

  
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
      // Before teamName is assigned to tableRow object, validate for extra whitespace
      const validatedTeamName = teamValue.trim()

      document.getElementById('team').value = "";
      
      //data row in table
      const tr = document.createElement('tr');
      const dTeamName = document.createElement('td');
      
      if(leagueTable.rows.length == 0) {
        tableRow.teamName = validatedTeamName;
      } else {
        for(const team in leagueTable.rows){
          if(team.teamName == validatedTeamName) {
            alert('Sorry, this Team Name already exists! Enter a unique name!')
            return;
          } else {
            // orig. in after for loop with alert()
            tableRow.teamName = validatedTeamName;
          }
        }
      }

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

      tableRow.id = Math.random()
      tableRow.playedWith = []
      leagueTable.rows.push(tableRow)
      console.log(tableRow)

  }

  // Submit new team
  document.getElementById('team-submit').onclick = (e) => {
      e.preventDefault();
      getTeamWithStatsRowInit();
    };
    console.log('SO FAR TABLE: ', leagueTable.rows)

  const newMatch = {
    team1: {},
    team2: {},
    score1: 0,
    score2: 0,
    overtime: false
  }

  // Generate all matches possible in a group
  const generatePossibleMatches = () => {
      // if(leagueTable.rows.length % 2 == 0) {
          const allMatches = leagueTable.rows.flatMap((t1, i) => leagueTable.rows.slice(i+1).map( (t2) => {
            newMatch.team1 = t1.teamName;
            newMatch.team2 = t2.teamName;
            return t1.teamName + ' VS ' + t2.teamName;
          }));
          console.log(allMatches);
      // } else {
      //   alert("There needs to be an even number of teams!")
      // }
    }
    
  const matchButton = document.querySelector('#generate-matches-button');
  matchButton.addEventListener('click', generatePossibleMatches);
            
            
})    
            
            