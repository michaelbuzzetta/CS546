/*

Create a team of your choice.
Log the newly created team. (Just that team, not all teams)
Create another team of your choice.
Query all team, and log them all
Create the 3rd team of your choice.
Log the newly created 3rd team. (Just that team, not all team)
Move the first team
Log the first team with the updated info. 
Remove the second team you created.
Query all teams, and log them all
Try to create a team with bad input parameters to make sure it throws errors.
Try to remove a team that does not exist to make sure it throws errors.
Try to rename a team that does not exist to make sure it throws errors.
Try to rename a team passing in invalid data to make sure it throws errors.
Try getting a team by ID that does not exist to make sure it throws errors.

*/
import {createTeam, removeTeam, getAllTeams, moveTeam, getTeamById} from './data/teams.js'
import {dbConnection, closeConnection} from './config/mongoConnection.js';
// import {teams} from "./config/mongoCollections.js";

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

const db = await dbConnection();
await db.dropDatabase();




async function main() 
{
    let yankees = await createTeam(
        "Yankees",
        "Baseball",
        1903,
        "New York",
        "NY",
        "Yankee Stadium",
        27,
        [
            { firstName: "DJ", lastName: "LeMahieu", position: "2B" },
            { firstName: "Aaron", lastName: "Judge", position: "RF" },
            { firstName: "Derek", lastName: "Jeter", position: "C" },
        ]
    );
    console.log("Created team 1:", yankees);
    let mets = await createTeam(
        "Mets",
        "Baseball",
        1962,
        "New York",
        "NY",
        "Citi Field",
        2,
        [
            { firstName: "Brandon", lastName: "Nimmo", position: "CF" },
            { firstName: "Francisco", lastName: "Lindor", position: "SS" },
            { firstName: "David", lastName: "Wright", position: "3B"}
        ]
    );
    console.log("Created team 2:", mets);

    let allTeams = await getAllTeams();
    console.log("All teams:", allTeams);

    let team3 = await createTeam(
        "Dodgers",
        "Baseball",
        1883,
        "Los Angeles",
        "CA",
        "Dodger Stadium",
        7,
        [
            { firstName: "Mookie", lastName: "Betts", position: "RF" },
            { firstName: "Freddie", lastName: "Freeman", position: "1B" },
        ]
    );
    console.log("Created team 3:", team3);
    let movedTeam1 = await moveTeam(yankees._id, "Hoboken", "NJ", "Elysian Fields");
    console.log("Updated team 1:", movedTeam1);
    let removeTeam2 = await removeTeam(mets._id);
    console.log("Removed team 2:", removeTeam2);
    let allTeamsAfterRemoval = await getAllTeams();
    console.log("All teams after removal:", allTeamsAfterRemoval);
    try 
    {
        await createTeam("", "", 2025, "", "", "", -1, []);
    } 
    catch (e) 
    {
        console.log("5", e);
    }
    try 
    {
        await removeTeam("asdfghjkl");
    } 
    catch (e) 
    {
        console.log("4", e);
    }
    try 
    {
        await moveTeam("asdfghjkl", "Newark", "NJ", "Newark Stadium");
    } 
    catch (e) 
    {
        console.log("3", e);
    }
    try 
    {
        await moveTeam(yankees._id, "", "XX", "");
    } 
    catch (e) 
    {
        console.log("2", e);
    }
    try 
    {
        await getTeamById("asdfghjkl");
    } 
    catch (e) 
    {
        console.log("1", e);
    }
    
    await closeConnection();
    //return "Done";

}
main();




