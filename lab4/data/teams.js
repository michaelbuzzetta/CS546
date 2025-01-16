import { teams } from "../config/mongoCollections.js";
import * as help from "../helpers.js";
import { ObjectId } from "mongodb";

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

// TODO: Export and implement the following functions in ES6 format
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
  help.teamVerify(name, sport, yearFounded, city, state, stadium, championshipsWon, players);
  name=name.trim();
  sport=sport.trim();
  city=city.trim();


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
  };

  let updatedTeam= await teamCollection.insertOne(team);
  let outputTeam= await teamCollection.findOne({_id: updatedTeam.insertedId});

  return {
    _id: outputTeam._id.toString(),
    name: outputTeam.name,
    sport: outputTeam.sport,
    yearFounded: outputTeam.yearFounded,
    city: outputTeam.city,
    state: outputTeam.state,
    stadium: outputTeam.stadium,
    championshipsWon: outputTeam.championshipsWon,
    players: outputTeam.players
  };
};

export const getAllTeams = async () => 
{
  let teamCollection= await teams();
  let teamList=await teamCollection.find({}).toArray();

  if(teamList.length==0)
  {
    return [];
  }
  teamList.map((element)=>
  {
    element._id=element._id.toString();
  });
  return teamList;
};

export const getTeamById = async (id) => 
{
  help.idVerify(id);
  id=id.trim();
  let teamCollection = await teams();
  let teamInfo = await teamCollection.findOne({ _id: ObjectId.createFromHexString(id) });
  if (!teamInfo) throw "No team with that id";
  teamInfo=teamInfo.map((element)=>
  {
    element._id=element._id.toString();
  });
  return teamInfo;
};

export const removeTeam = async (id) => 
{
  help.idVerify(id);
  id=id.trim();
  let teamCollection = await teams();
  let teamName=getTeamById(id);
  let deleteInfo = await teamCollection.findOneAndDelete({_id: ObjectId.createFromHexString(id)});
  if (!deleteInfo) throw "Could not delete team with that id";

  return `${teamName.name} successfully deleted;`
};

export const moveTeam = async (id, newCity, newState, newStadium) => 
{
  await help.moveVerify(id, newCity, newState, newStadium);
  id=id.trim();
  let teamsCollection = await teams();
  let updatedTeam = await teamsCollection.findOneAndUpdate(
    {_id: ObjectId.createFromHexString(id)},
    {$set: 
      {
        city: newCity,
        state: newState,
        stadium: newStadium,
      },
    },
    {returnDocument: "after"}
  );

  if (!updatedTeam) throw "Error, team not found.";
  updatedTeam._id=updatedTeam._id.toString();
  return updatedTeam;
};

export default{createTeam, getAllTeams, getTeamById, removeTeam, moveTeam};