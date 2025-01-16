// This data file should export all functions using the ES6 standard as shown in the lecture code

import { teams } from "../config/mongoCollections.js";
import * as help from "../helpers.js";
import { ObjectId, ReturnDocument } from "mongodb";
import * as games from "./games.js";

/*
CAs that helped
Jack Gibson
Bernard Vitale
Guatam Ahuja
Jack Gibson
*/

export const createTeam = async (
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) =>
{
  help.teamVerify(name, sport, yearFounded, city, state, stadium, championshipsWon,players);
  name=name.trim();
  sport=sport.trim();
  city=city.trim();
  state=state.trim();
  stadium=stadium.trim();


  let teamCollection=await teams();
  let team = 
  {
    name,
    sport,
    yearFounded,
    city,
    state,
    stadium,
    championshipsWon,
    players,
    winLossCount:"0-0",
    games:[]
  };
  


  let updatedTeam= await teamCollection.insertOne(team);
  let outputTeam= await teamCollection.findOne({_id: updatedTeam.insertedId});
  outputTeam._id =outputTeam._id.toString();

  return outputTeam;
};

export const getAllTeams = async () =>
{
  let teamCollection= await teams();
  let teamList=await teamCollection.find({}, { projection: { _id: 1, name: 1 } }).toArray();

  if(teamList.length==0)
  {
    return [];
  }
  return teamList.map(team => ({
    id: team._id.toString(),
    name: team.name
  }));
};

export const getTeamById = async (id) => 
{
  help.idVerify(id);
  id=id.trim();
  let teamCollection = await teams();
  let teamInfo = await teamCollection.findOne({ _id: ObjectId.createFromHexString(id) });
  if (!teamInfo) throw "No team with that id";
  teamInfo._id=teamInfo._id.toString();
  return teamInfo;
};

export const removeTeam = async (id) => 
{
  help.idVerify(id);
  id=id.trim();
  let teamCollection = await teams();
  // let teamName=getTeamById(id);
  let deleteInfo = await teamCollection.findOneAndDelete({_id: ObjectId.createFromHexString(id)});
  if (!deleteInfo) throw "Could not delete team with that id";
  return { _id: id, deleted: true };
};

export const updateTeam = async (
  id,
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) =>
{
  help.teamVerify(name, sport, yearFounded, city, state, stadium, championshipsWon,players);
  help.idVerify(id);

  id=id.trim();
  name=name.trim();
  sport=sport.trim();
  city=city.trim();

  let teamCollection=await teams();
  let oldTeam=await getTeamById(id);

  let newTeam = 
  {
    name,
    sport,
    yearFounded,
    city,
    state,
    stadium,
    championshipsWon,
    players,
    players,
    winLossCount: oldTeam.winLossCount,
    games: oldTeam.games
  };

  let updatedTeam= await teamCollection.findOneAndReplace(
    {_id: ObjectId.createFromHexString(id)},
    newTeam,
    {ReturnDocument: 'after'}
    );

  if(!updatedTeam)
  {
    throw "Error, update failed."
  }

  return updatedTeam;
};
