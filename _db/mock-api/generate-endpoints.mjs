import { buildMockRacingHistory } from "../mock-data/generators/results/build-results-history.mjs";
import { buildMockRacerInfo } from "../mock-data/generators/rider/build-rider.mjs";
import { generateRandomTeam } from "../mock-data/generators/helper-functions.mjs";

const racers = [];
const history = [];
const teams = [];

const buildTeams = () => {
    for (let i=0; i < 10; i++) {
        const newTeam = {
            name: generateRandomTeam(4),
            riders: 0
        }
        teams.push(newTeam);
    }
    return teams;
}

const getTeamForRider = () => {
    const availableTeams = teams.filter(team => team.riders < 10);

    if (!availableTeams) {
        return generateRandomTeam(4);
    }

    const randomIndex = Math.floor(Math.random() * availableTeams.length)
    availableTeams[randomIndex].riders++
    return availableTeams[randomIndex].name;
}

const buildRiders = () => {
    for (let i=1; i < 100; i++) {
        const assignedTeam = getTeamForRider();
        const newRider = buildMockRacerInfo({id: i}, assignedTeam);
        racers.push(newRider);
        const newHistory = {racerId: i, results: buildMockRacingHistory()}
        history.push(newHistory)
    }
}

buildTeams();
buildRiders();

const endpoints = {
    racers,
    history
}

console.log(JSON.stringify(endpoints));

// node src/_db/mock-api/generate-endpoints.mjs > src/_db/mock-api/endpoints.json