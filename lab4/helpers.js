// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import { ObjectId } from "mongodb";
import {teams} from "./config/mongoCollections.js";
let teamData=await teams();

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

const validState = 
[
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const teamVerify =(name, sport, yearFounded, city, state, stadium, championshipsWon, players) =>
{
    if(name==null || sport==null || yearFounded==null || city==null || state==null || stadium==null || championshipsWon==null || players==null)
    {
        throw "Error, input cannot be null";
    }
    if(typeof(name) !== "string" || typeof(sport) !== "string" || typeof(yearFounded) !== "number" || typeof(city) !== "string" || typeof(state) !== "string" || typeof(stadium) !== "string" || typeof(championshipsWon) !== "number" || !Array.isArray(players))
    {
        throw "Error, input is not the correct type";
    }
    name=name.trim();
    sport=sport.trim();
    city=city.trim().toUpperCase();
    state=state.trim().toUpperCase();
    stadium=stadium.trim();
    if(state.length !== 2) throw "Error, please enter state abbreviation";
    if(!validState.includes(state)) throw "Error, state is not valid";
    let today=new Date();
    if(yearFounded<1850 || yearFounded>today.getFullYear()) throw "Error, please enter a valid year";
    if(championshipsWon<0) throw "Error, you can't win negative championships";
    if(!Number.isInteger(yearFounded) || !Number.isInteger(championshipsWon)) throw "Error, please enter a whole number";
    if(players.length==0) throw "Error, theres gotta be atleast one player";
    players.forEach((player)=>
    {
        if (typeof player !== 'object' || Array.isArray(player)) throw `Player must be an object`;
        if (Object.keys(player).length !== 3) throw "Error, too few data points";
        if (!player.firstName || typeof player.firstName !== 'string' || player.firstName.trim().length === 0) throw `Player must have a valid firstName`;
        if (!player.lastName || typeof player.lastName !== 'string' || player.lastName.trim().length === 0) throw `Player must have a valid lastName`;
        if (!player.position || typeof player.position !== 'string' || player.position.trim().length === 0) throw `Player must have a valid position`;
    });

}

export const idVerify=(id)=>
{
    if(id===null) throw "Error, ID cannot be null";
    if(typeof id !== "string") throw "Error, ID must be a string";
    id=id.trim();
    if(id.length == 0) throw "Error, ID cannot be an empty string";
    if(!ObjectId.isValid(id)) throw "Error, id is not valid";
    if(teamData.findOne(new ObjectId(id))==null) throw "Error, id does not exist";
    return id;
}

export const moveVerify=async(id, newCity, newState, newStadium)=>
{
    if(id==null) throw "Error, please enter an ID";
    if (typeof id !== 'string' || id.trim().length === 0) throw 'Team ID must be a non-empty string';
    id=id.trim();
    if (!ObjectId.isValid(id)) throw 'Error, invalid ObjectId format';
    if (await teamData.findOne(new ObjectId(id))==null) throw "Error, id does not exist";
    if (newCity == null || newState == null || newStadium == null) throw "Error, you are missing atleast one input";
    if (typeof newCity !== "string" || typeof newState !== "string" || typeof newStadium !== "string") throw "Error, atleast one of your inputs is the wring data type";
    newCity=newCity.trim();
    newState=newState.trim().toUpperCase();
    newStadium= newStadium.trim();
    if(newCity.length==0 || newState.length==0 || newStadium.legnth==0) throw "Error, atleast one of your inputs is empty";
    if(newState.length !==2) throw "Error, your state is not valid";
    if(!validState.includes(newState)) throw "Error, your state is not a valid abbreviation";
}