let teams = JSON.parse(localStorage.getItem("teams")) || {};

function getTeam(name) {
    if (!teams[name]) {
        teams[name] = {
            name,
            P: 0, W: 0, D: 0, L: 0,
            GF: 0, GA: 0, GD: 0, PTS: 0
        };
    }
    return teams[name];
}

function addMatch() {
    const teamAName = document.getElementById("teamA").value.trim();
    const teamBName = document.getElementById("teamB").value.trim();
    const scoreA = Number(document.getElementById("scoreA").value);
    const scoreB = Number(document.getElementById("scoreB").value);

    if (!teamAName || !teamBName || isNaN(scoreA) || isNaN(scoreB)) {
        alert("Please fill all fields correctly");
        return;
    }

    const teamA = getTeam(teamAName);
    const teamB = getTeam(teamBName);

    teamA.P++; teamB.P++;
    teamA.GF += scoreA; teamA.GA += scoreB;
    teamB.GF += scoreB; teamB.GA += scoreA;

    if (scoreA > scoreB) {
        teamA.W++; teamA.PTS += 3;
        teamB.L++;
    } else if (scoreB > scoreA) {
        teamB.W++; teamB.PTS += 3;
        teamA.L++;
    } else {
        teamA.D++; teamB.D++;
        teamA.PTS++; teamB.PTS++;
    }

    teamA.GD = teamA.GF - teamA.GA;
    teamB.GD = teamB.GF - teamB.GA;

    localStorage.setItem("teams", JSON.stringify(teams));
    displayTable();
    clearForm();
}

function displayTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    const sortedTeams = Object.values(teams).sort((a, b) =>
        b.PTS - a.PTS || b.GD - a.GD || b.GF - a.GF
    );

    sortedTeams.forEach(team => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${team.name}</td>
            <td>${team.P}</td>
            <td>${team.W}</td>
            <td>${team.D}</td>
            <td>${team.L}</td>
            <td>${team.GF}</td>
            <td>${team.GA}</td>
            <td>${team.GD}</td>
            <td>${team.PTS}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById("teamA").value = "";
    document.getElementById("teamB").value = "";
    document.getElementById("scoreA").value = "";
    document.getElementById("scoreB").value = "";
}

displayTable();
