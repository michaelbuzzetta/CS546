// This data file should export all functions using the ES6 standard as shown in the lecture code
import * as team from "./teams.js";
import { teams } from "../config/mongoCollections.js";
import { ObjectId, ReturnDocument } from "mongodb";
import * as help from "../helpers.js";

/*
CAs that helped
Jack Gibson
Bernard Vitale
Guatam Ahuja
Jack Gibson
*/

export const createGame = async (
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) =>
{
  help.gameVerify(teamId, gameDate, opposingTeamId, homeOrAway, finalScore, win);
  let teamCollection=await teams();
  let team1 = await teamCollection.findOne({_id:ObjectId.createFromHexString(teamId)});
  let team2 = await teamCollection.findOne({_id:ObjectId.createFromHexString(opposingTeamId)});

  if (!team1 || !team2) 
  {
    throw "Error, one or both teams with the provided IDs do not exist.";
  }
  if (team1.sport !== team2.sport) 
  {
    throw "Error, teams must belong to the same sport to create a game.";
  }

  // let [team1Score, team2Score] = finalScore.split('-').map(Number);
  // let flippedScore = `${team2Score}-${team1Score}`;
  //console.log(team2._id);

  let newGame = {
    _id: new ObjectId(),
    gameDate: gameDate.trim(),
    opposingTeamId: ObjectId.createFromHexString(opposingTeamId),
    homeOrAway: homeOrAway.trim(),
    finalScore: finalScore.trim(),
    win,
  };
  // let opposingHomeOrAway;
  // if (homeOrAway === "Home") 
  // {
  //   opposingHomeOrAway = "Away";
  // } else 
  // {
  //   opposingHomeOrAway = "Home";
  // }
  // let opposingGame=
  // {
  //   _id: new ObjectId(),
  //   gameDate: gameDate.trim(),
  //   opposingTeamId: new ObjectId(team1._id),
  //   homeOrAway: opposingHomeOrAway,
  //   finalScore: flippedScore.trim(),
  //   win: !win,
  // }

  team1.games.push(newGame);
  //team2.games.push(opposingGame);
  let [wins, losses] = team1.winLossCount.split('-').map(Number);
  if (win) {
    wins += 1;
  } else {
    losses += 1;
  }
  team1.winLossCount = `${wins}-${losses}`;

  // let [opposingWins, opposingLosses] = team2.winLossCount.split('-').map(Number);
  // if (win) {
  //   opposingLosses += 1;
  // } else {
  //   opposingWins += 1;
  // }
  // team2.winLossCount = `${opposingWins}-${opposingLosses}`;

  let updatedTeam1 = await teamCollection.findOneAndUpdate(
    {_id: ObjectId.createFromHexString(teamId)},
    {$set: { games: team1.games, winLossCount: team1.winLossCount}},
    {returnDocument: 'after'}
  );

  // let updatedTeam2 = await teamCollection.findOneAndUpdate(
  //   {_id: ObjectId.createFromHexString(opposingTeamId)},
  //   {$set: { games: team2.games, winLossCount: team2.winLossCount}},
  //   {returnDocument: 'after'}
  // )

  if (!updatedTeam1) throw "Error, failed to create the game.";
  return updatedTeam1;
};

export const getAllGames = async (teamId) =>
{
  help.idVerify(teamId);

  let teamCollection = await teams();
  let team = await teamCollection.findOne(
    { _id: ObjectId.createFromHexString(teamId) },
    { projection: { games: 1 } }
  );

  if (!team) throw "Error, team not found.";
  return team.games;
};

export const getGame = async (gameId) =>
{
  help.idVerify(gameId);
  gameId=gameId.trim();

  let teamCollection = await teams();
  let team = await teamCollection.findOne(
    { "games._id": ObjectId.createFromHexString(gameId)},
    { projection: { "games.$": 1 } }
  );

  if (!team) throw "Error, game not found.";
  return team.games[0];
};

export const updateGame = async (gameId, updateObject) => 
{
  help.idVerify(gameId);
  help.gameUpdateVerify(gameId, updateObject);
  gameId=gameId.trim();
  // updateObject=updateObject.trim();

  let teamCollection = await teams();
  let teamPlayer= await teamCollection.findOne({"games._id": ObjectId.createFromHexString(gameId)});
  if(!teamPlayer)
  {
    throw "Error, not team played that game";
  }
  let specGame=teamPlayer.games.findIndex(game=>game._id.toString()==gameId);
  if(specGame==-1)
  {
    throw "Error, no game.";
  }
  let gameCopy=teamPlayer.games[specGame];
  if(updateObject.gameDate !== undefined)
  {
    gameCopy.gameDate=updateObject.gameDate;
  }
  else
  {
    gameCopy.gameDate=teamPlayer.games[specGame].gameDate;
  }

  if(updateObject.opposingTeamId !== undefined)
  {
    gameCopy.opposingTeamId=ObjectId.createFromHexString(updateObject.opposingTeamId);
  }
  else
  {
    gameCopy.opposingTeamId=teamPlayer.games[specGame].opposingTeamId;
  }

  if(updateObject.homeOrAway !== undefined)
  {
    gameCopy.homeOrAway=updateObject.homeOrAway;
  }
  else
  {
    gameCopy.homeOrAway=teamPlayer.games[specGame].homeOrAway;
  }

  if(updateObject.finalScore !== undefined)
  {
    gameCopy.finalScore=updateObject.finalScore;
  }
  else
  {
    gameCopy.finalScore=teamPlayer.games[specGame].finalScore;
  }
  let [wins, losses] = teamPlayer.winLossCount.split('-').map(Number);
  if(updateObject.win !== undefined && updateObject.win !== gameCopy.win)
  {
    if(updateObject.win==true)
    {
      wins+=1;
      losses-=1;
    }
    else
    {
      losses+=1;
      wins-=1;
    }
  }
  let newWinLossCount = `${wins}-${losses}`;
  if(updateObject.win !== undefined)
  {
    gameCopy.win=updateObject.win;
  }
  else
  {
    gameCopy.win=teamPlayer.games[specGame].win;
  }

  teamPlayer.games[specGame]=gameCopy;

  let updatedGame=await teamCollection.findOneAndUpdate(
    { _id: teamPlayer._id },
    { $set: {games: teamPlayer.games, winLossCount: newWinLossCount}},
    { returnDocument: 'after' }
  );

  if(!updatedGame)
  {
    throw "Error, could not update game.";
  }
  return updatedGame;

};

export const removeGame = async (gameId) =>
{
  help.idVerify(gameId);
  gameId=gameId.trim();
  let teamCollection = await teams();
  let team = await teamCollection.findOne({ "games._id": ObjectId.createFromHexString(gameId) });
  if (!team) throw "Error, game not found.";

  let importantGame = team.games.find((game)=>game._id.toString() == gameId);
  if(!importantGame)
  {
    throw "Error, cannot find that game";
  }
  let otherGames=team.games.filter((game)=>game._id.toString() !== gameId);
  let [wins, losses] = team.winLossCount.split('-').map(Number);
  if (importantGame.win) 
  {
    wins -= 1;
  } 
  else 
  {
    losses -= 1;
  }
  let updatedWinLossCount = `${wins}-${losses}`;
  let deletedGame=await teamCollection.findOneAndUpdate(
    { _id: team._id },
    { $set: { games: otherGames, winLossCount: updatedWinLossCount } },
    { returnDocument: 'after' }
  );
  if(!deletedGame)
  {
    throw "Error, could not delete game with that ID";
  }

  return deletedGame;
};
