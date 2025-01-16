import { createTeam } from './data/teams.js';
import { createGame } from './data/games.js';
import { ObjectId } from 'mongodb';
import {dbConnection, closeConnection} from './config/mongoConnection.js';


async function main() {
  const db = await dbConnection();
  await db.dropDatabase();
  try {
    console.log("Starting to populate the database with teams and games...");

    const team1 = await createTeam(
      'Yankees',
      'Baseball',
      1903,
      'New York',
      'NY',
      'Yankee Stadium',
      27,
      [
        { firstName: 'Aaron', lastName: 'Judge', position: 'RF' },
        { firstName: 'Giancarlo', lastName: 'Stanton', position: 'DH' }
      ]
    );

    const team2 = await createTeam(
      'Lakers',
      'Basketball',
      1947,
      'Los Angeles',
      'CA',
      'Crypto.com Arena',
      17,
      [
        { firstName: 'LeBron', lastName: 'James', position: 'SF' },
        { firstName: 'Anthony', lastName: 'Davis', position: 'PF' }
      ]
    );

    const team3 = await createTeam(
      'Patriots',
      'Football',
      1959,
      'New England',
      'MA',
      'Gillette Stadium',
      6,
      [
        { firstName: 'Mac', lastName: 'Jones', position: 'QB' },
        { firstName: 'Matthew', lastName: 'Slater', position: 'WR' }
      ]
    );

    const team4 = await createTeam(
      'Mets',
      'Baseball',
      1962,
      'New York',
      'NY',
      'Citi Field',
      2,
      [
        { firstName: 'Pete', lastName: 'Alonso', position: '1B' },
        { firstName: 'Francisco', lastName: 'Lindor', position: 'SS' }
      ]
    );

    const team5 = await createTeam(
      'Warriors',
      'Basketball',
      1946,
      'San Francisco',
      'CA',
      'Chase Center',
      7,
      [
        { firstName: 'Stephen', lastName: 'Curry', position: 'PG' },
        { firstName: 'Klay', lastName: 'Thompson', position: 'SG' }
      ]
    );

    const team6 = await createTeam(
      "Lions",
      "Football",
      1930,
      "Detroit",
      "MI",
      "Ford Field",
      4,
      [
        { firstName: "Jared", lastName: "Goff", position: "QB" },
        { firstName: "Amon-Ra", lastName: "St. Brown", position: "WR" },
        { firstName: "David", lastName: "Montgomery", position: "RB" },
        { firstName: "Penei", lastName: "Sewell", position: "OT" },
        { firstName: "Aidan", lastName: "Hutchinson", position: "DE" },
      ],
    );

    await createGame(team1._id, '05/10/2023', team4._id, 'Home', '4-2', true);
    await createGame(team1._id, '06/12/2023', team4._id, 'Away', '3-5', false);
    await createGame(team1._id, '07/18/2023', team4._id, 'Home', '7-1', true);

    await createGame(team2._id, '03/01/2023', team5._id, 'Home', '120-115', true);
    await createGame(team2._id, '04/15/2023', team5._id, 'Away', '99-101', false);
    await createGame(team2._id, '05/21/2023', team5._id, 'Home', '105-95', true);

    await createGame(team3._id, '09/10/2023', team6._id, 'Away', '24-21', true);
    await createGame(team3._id, '10/12/2023', team6._id, 'Home', '17-20', false);
    await createGame(team3._id, '11/08/2023', team6._id, 'Away', '31-28', true);

    // await createGame(team4._id, '05/20/2023', team1._id, 'Away', '5-3', false);
    // await createGame(team4._id, '06/25/2023', team5._id, 'Home', '7-6', true);
    // await createGame(team4._id, '07/14/2023', team2._id, 'Away', '8-4', true);

    // await createGame(team5._id, '01/05/2023', team2._id, 'Away', '100-98', true);
    // await createGame(team5._id, '02/17/2023', team3._id, 'Home', '88-92', false);
    // await createGame(team5._id, '03/12/2023', team4._id, 'Away', '95-93', true);

    console.log("Database successfully populated with teams and games!");

  } catch (error) {
    console.error("An error occurred while populating the database:", error);
  } finally {
    await closeConnection();
    console.log("Database connection closed.");
  }
}

main();
