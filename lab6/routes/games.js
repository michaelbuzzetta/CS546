import { Router } from 'express';
import * as gameData from '../data/games.js';
import * as helper from '../helpers.js';

let router = Router();
/*
CAs that helped
Jack Gibson
Bernard Vitale
Guatam Ahuja
Jack Gibson
*/

router
  .route('/:teamId')
  .get(async (req, res) => {
    //code here for GET
    try 
    {
      let verifiedTeamId = helper.idVerify(req.params.teamId);
      let games = await gameData.getAllGames(verifiedTeamId); 
      res.json(games);
    } 
    catch (e) 
    {
      let errorMessage;
      if (e instanceof Error) 
      {
        errorMessage = e.message;
      } 
      else 
      {
        errorMessage = e;
      }     
      
      if (typeof errorMessage === 'string' && errorMessage.includes('No team')) 
      {
        res.status(404).json({ error: errorMessage });
      } 
      else 
      {
        res.status(400).json({ error: errorMessage });
      }
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let gameInfo = req.body;

    if (!gameInfo || Object.keys(gameInfo).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    try {
      let verifiedTeamId = helper.idVerify(req.params.teamId);

      await helper.gameVerify(
        verifiedTeamId,
        gameInfo.gameDate,
        gameInfo.opposingTeamId,
        gameInfo.homeOrAway,
        gameInfo.finalScore,
        gameInfo.win
      );

      let newGame = await gameData.createGame(
        verifiedTeamId,
        gameInfo.gameDate,
        gameInfo.opposingTeamId,
        gameInfo.homeOrAway,
        gameInfo.finalScore,
        gameInfo.win
      );

      res.status(200).json(newGame);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/game/:gameId')
  .get(async (req, res) => {
    //code here for GET
    try {
      let verifiedGameId = helper.idVerify(req.params.gameId);
      let game = await gameData.getGame(verifiedGameId);
      res.json(game);
    } catch (e) {
      let errorMessage;
      if (e instanceof Error) 
      {
        errorMessage = e.message;
      } 
      else 
      {
        errorMessage = e;
      }     
      
      if (typeof errorMessage === 'string' && errorMessage.includes('No team')) 
      {
        res.status(404).json({ error: errorMessage });
      } 
      else 
      {
        res.status(400).json({ error: errorMessage });
      }
    }
  })
  .patch(async (req, res) => {
    //code here for PATCH
    let updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'Request body is empty' });
    }

    try {
      let verifiedGameId = helper.idVerify(req.params.gameId);

      let updatedGame = await gameData.updateGame(verifiedGameId, updatedData);

      res.json(updatedGame);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      let verifiedGameId = helper.idVerify(req.params.gameId);
      let deletedGame = await gameData.removeGame(verifiedGameId);
      res.json(deletedGame);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

export default router;
