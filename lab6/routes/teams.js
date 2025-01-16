import { Router } from 'express';
import * as teamData from '../data/teams.js';
import * as helper from '../helpers.js';
import { ObjectId } from 'mongodb';


let router = Router();

/*
CAs that helped
Jack Gibson
Bernard Vitale
Guatam Ahuja
Jack Gibson
*/

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      let teams = await teamData.getAllTeams();
      res.json(teams);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let teamDataInput = req.body;
    if (!teamDataInput || Object.keys(teamDataInput).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    try {
      helper.teamVerify(
        teamDataInput.name,
        teamDataInput.sport,
        teamDataInput.yearFounded,
        teamDataInput.city,
        teamDataInput.state,
        teamDataInput.stadium,
        teamDataInput.championshipsWon,
        teamDataInput.players
      );

      let newTeam = await teamData.createTeam(
        // teamDataInput._id=new ObjectId.createFromHexString(_id),
        teamDataInput.name,
        teamDataInput.sport,
        teamDataInput.yearFounded,
        teamDataInput.city,
        teamDataInput.state,
        teamDataInput.stadium,
        teamDataInput.championshipsWon,
        teamDataInput.players
      );

      res.status(201).json(newTeam);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/:teamId')
  .get(async (req, res) => {
    //code here for GET
    try 
    {
      req.params.teamId=helper.idVerify(req.params.teamId);
    }
    catch(e)
    {
      return res.status(500).send(e);
    }
    try
    {
      let team = await teamData.getTeamById(req.params.teamId);
      return res.json(team);
    } 
    catch (e){
      let errorMessage;
      
      if (e instanceof Error) 
      {
        errorMessage = e.message;
      } 
      else 
      {
        errorMessage = e;
      }
  
      if (errorMessage.includes('No team')) 
      {
        res.status(404).json({ error: errorMessage });
      } 
      else 
      {
        res.status(400).json({ error: errorMessage });
      }
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      let teamId = helper.idVerify(req.params.teamId);
      let deletedTeam = await teamData.removeTeam(teamId);
      return res.json(deletedTeam);
    } catch (e) {
      let errorMessage;
      
      if (e instanceof Error) {
        errorMessage = e.message;
      } else {
        errorMessage = e;
      }
    
      if (errorMessage.includes('No team')) {
        return res.status(404).json({ error: errorMessage });
      } else {
        return res.status(400).json({ error: errorMessage });
      }
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      //console.log(error);
      return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    try {
      req.params.teamId = helper.idVerify(req.params.teamId);
      helper.teamVerify(
        updatedData.name,
        updatedData.sport,
        updatedData.yearFounded,
        updatedData.city,
        updatedData.state,
        updatedData.stadium,
        updatedData.championshipsWon,
        updatedData.players
      );
      let updatedTeam = await teamData.updateTeam(
        req.params.teamId,
        updatedData.name,
        updatedData.sport,
        updatedData.yearFounded,
        updatedData.city,
        updatedData.state,
        updatedData.stadium,
        updatedData.championshipsWon,
        updatedData.players
      );

      res.json(updatedTeam);
    } catch (e) {
      let errorMessage;
      if (e instanceof Error) {
        errorMessage = e.message;
      } 
      else 
      {
        errorMessage = e;
      }

      if (errorMessage.includes('No team')) 
      {
        return res.status(404).json({ error: errorMessage });
      } 
      else 
      {
        return res.status(400).json({ error: errorMessage });
      }
    }
  });

export default router;
