document.addEventListener('DOMContentLoaded', ()=> {
    // Main league table
    const leagueTable = {
        rows: []
    }

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
        tableRow.teamName = teamValue;

        //data row in table
        const tr = document.createElement('tr');
        const dTeamName = document.createElement('td');
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
        table.appendChild(tr);
        table.style.border = "solid 0.1rem black";
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
        console.log(leagueTable.rows)
    };



    // Generate random pair
    let duplicateTable = leagueTable.rows.slice();
    const generateMatches = () => {
      console.log(duplicateTable)
      const newMatch = {
        team1: '',
        team2: '',
        score1: 0,
        score2: 0
      }
      
     
      }
      const matchButton = document.querySelector('#generate-button');
      matchButton.addEventListener('click', generateMatches);
              
              
})    
            
            