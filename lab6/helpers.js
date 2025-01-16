// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import { getAdapter } from "axios";
import { teams } from "./config/mongoCollections.js";
import { ObjectId } from "mongodb";

/*
CAs that helped
Jack Gibson
Bernard Vitale
Guatam Ahuja
Jack Gibson
*/

const validState = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const teamVerify = (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) => {
  if (
    name == null &&
    sport == null &&
    yearFounded == null &&
    city == null &&
    state == null &&
    stadium == null &&
    championshipsWon == null &&
    players == null
  ) {
    throw "Error, input cannot be null";
  }
  if (
    typeof name !== "string" &&
    typeof sport !== "string" &&
    typeof yearFounded !== "number" &&
    typeof city !== "string" &&
    typeof state !== "string" &&
    typeof stadium !== "string" &&
    typeof championshipsWon !== "number" &&
    !Array.isArray(players)
  ) {
    throw "Error, input is not the correct type";
  }
  name = name.trim();
  sport = sport.trim();
  city = city.trim();
  state = state.trim().toUpperCase();
  stadium = stadium.trim();
  if (name == "" || sport == "" || city == "" || state == "" || stadium == "") {
    throw "Error, input cannot be just spaces";
  }
  if (state.length !== 2) throw "Error, please enter state abbreviation";
  if (!validState.includes(state)) throw "Error, state is not valid";
  let today = new Date();
  if (yearFounded < 1850 || yearFounded > today.getFullYear())
    throw "Error, please enter a valid year";
  if (championshipsWon < 0) throw "Error, you can't win negative championships";
  if (!Number.isInteger(yearFounded) || !Number.isInteger(championshipsWon))
    throw "Error, please enter a whole number";
  if (players.length == 0) throw "Error, theres gotta be atleast one player";
  players.forEach((player) => {
    if (typeof player !== "object" || Array.isArray(player))
      throw `Player must be an object`;
    if (Object.keys(player).length !== 3) throw "Error, too few data points";
    if (
      !player.firstName ||
      typeof player.firstName !== "string" ||
      player.firstName.trim().length === 0
    )
      throw `Player must have a valid firstName`;
    if (
      !player.lastName ||
      typeof player.lastName !== "string" ||
      player.lastName.trim().length === 0
    )
      throw `Player must have a valid lastName`;
    if (
      !player.position ||
      typeof player.position !== "string" ||
      player.position.trim().length === 0
    )
      throw `Player must have a valid position`;
  });
};

export const idVerify = (id) => {
  if (id === null) throw "Error, ID cannot be null";
  if (typeof id !== "string") throw "Error, ID must be a string";
  id = id.trim();
  if (id.length == 0) throw "Error, ID cannot be an empty string";
  if (!ObjectId.isValid(id)) throw "Error, id is not valid";
  return id;
};

export const gameVerify = async (
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) => {
  if (
    teamId == null ||
    gameDate == null ||
    opposingTeamId == null ||
    homeOrAway == null ||
    finalScore == null ||
    win == null
  ) {
    throw "Error, one or more data points is empty";
  }
  if (
    typeof teamId !== "string" ||
    typeof gameDate !== "string" ||
    typeof opposingTeamId !== "string" ||
    typeof homeOrAway !== "string" ||
    typeof finalScore !== "string"
  ) {
    throw "Error, incorrect data type";
  }
  teamId = teamId.trim();
  gameDate = gameDate.trim();
  opposingTeamId = opposingTeamId.trim();
  homeOrAway = homeOrAway.trim();
  finalScore = finalScore.trim();
  if (
    teamId == "" ||
    gameDate == "" ||
    opposingTeamId == "" ||
    homeOrAway == "" ||
    finalScore == ""
  ) {
    throw "Error, entry cannot be empty string or just spaces";
  }
  if (!ObjectId.isValid(teamId) || !ObjectId.isValid(opposingTeamId)) {
    throw "Error, one or more ID is not valid";
  }
  let teamCollection = await teams();
  let teamInfo = await teamCollection.findOne({
    _id: ObjectId.createFromHexString(teamId),
  });
  if (!teamInfo) throw "No team with that id";
  let opposingTeamInfo = await teamCollection.findOne({
    _id: ObjectId.createFromHexString(opposingTeamId),
  });
  if (!opposingTeamInfo) throw "No opposing team with that ID";
  //https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
  let dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!dateFormat.test(gameDate)) {
    throw "Error, invalid date format. Use mm/dd/yyyy.";
  }
  let [month, day, year] = gameDate.split("/").map(Number);
  let testDate = new Date(year, month - 1, day);
  if (
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day ||
    testDate.getFullYear() !== year
  ) {
    throw "Error, invalid calendar date.";
  }
  
  if (homeOrAway !== "Home" && homeOrAway !== "Away") {
    throw "Error, please enter either 'Home' or 'Away', case sensitive";
  }
  const scoreRegex = /^(\d+)-(\d+)$/;
  const scoreMatch = finalScore.match(scoreRegex);

  if (!scoreMatch) {
    throw "Error, incorrect format for score. Use 'X-Y'.";
  }

  const [score1, score2] = scoreMatch.slice(1).map(Number);

  if (score1 < 0 || score2 < 0) {
    throw "Error, scores cannot be negative.";
  }

  if (score1 === score2) {
    throw "Error, there must be a winner. No ties allowed.";
  }

  if (typeof win !== "boolean") throw "Error, incorect data type";
};

export const gameUpdateVerify = (gameId, updateObject) => {
  if (!gameId) {
    throw "Error, gameId is required.";
  } else if (typeof gameId !== "string" || gameId.trim() === "") {
    throw "Error, gameId must be a non-empty string.";
  } else if (!ObjectId.isValid(gameId)) {
    throw "Error, Invalid gameId format.";
  } else if (updateObject.gameDate) {
    if (typeof updateObject.gameDate !== "string" || updateObject.gameDate.trim() === "") 
    {
      throw "Error, gameDate must be a non-empty string.";
    } 
    let dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateFormat.test(updateObject.gameDate)) 
    {
      throw "Error, invalid date format. Use mm/dd/yyyy.";
    }
    let [month, day, year] = updateObject.gameDate.split("/").map(Number);
    let testDate = new Date(year, month - 1, day);
    if (testDate.getMonth() !== month - 1 || testDate.getDate() !== day || testDate.getFullYear() !== year) 
    {
      throw "Error, invalid calendar date.";
    }
  } 
  else if (updateObject.opposingTeamId) 
  {
    if (
      typeof updateObject.opposingTeamId !== "string" ||
      updateObject.opposingTeamId.trim() === ""
    ) {
      throw "Error, opposingTeamId must be a non-empty string.";
    } else if (!ObjectId.isValid(updateObject.opposingTeamId)) {
      throw "Error, Invalid opposingTeamId format.";
    }
  } else if (updateObject.homeOrAway) {
    if (
      typeof updateObject.homeOrAway !== "string" ||
      updateObject.homeOrAway.trim() === ""
    ) {
      throw "Error, homeOrAway must be a non-empty string.";
    } else if (
      updateObject.homeOrAway !== "Home" &&
      updateObject.homeOrAway !== "Away"
    ) {
      throw "Error, homeOrAway must be either 'Home' or 'Away'.";
    }
  } else if (updateObject.finalScore) {
    if (
      typeof updateObject.finalScore !== "string" ||
      updateObject.finalScore.trim() === ""
    ) {
      throw "Error, finalScore must be a non-empty string.";
    } else if (!/^\d+-\d+$/.test(updateObject.finalScore)) {
      throw "Error, finalScore must be in 'X-Y' format.";
    } else {
      const [score1, score2] = updateObject.finalScore.split("-").map(Number);
      if (score1 < 0 || score2 < 0 || score1 === score2) {
        throw "Error, finalScore must contain non-negative, non-equal values.";
      }
    }
  } else if (updateObject.win !== undefined) {
    if (typeof updateObject.win !== "boolean") {
      throw "Error, win must be a boolean.";
    }
  }
};
