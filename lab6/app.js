// This file should set up the express server as shown in the lecture code

import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';
// import teamsRoutes from './routes/teams.js';
// import gamesRoutes from './routes/games.js';

app.use(express.json());
// app.use('/teams', teamsRoutes);
// app.use('/games', gamesRoutes);
configRoutesFunction(app);


app.listen(3000, () => 
{
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});