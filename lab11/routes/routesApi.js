// Set-Up Routes

import { Router } from 'express';
import express from "express";
import path from 'path';

let router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET to show static HTML flie
  //IF you have any other routes besides this one, you will get a 0. everything must be done via client-side and AJAX requests (a client-side fetch or axios request can be used instead of AJAX)
  try {
    res.sendFile(path.resolve("static/webpage.html"));
  } catch (error) {
    res.status(500).send({ error: 'Unable to load the HTML file.' });
  }
});

export default router;