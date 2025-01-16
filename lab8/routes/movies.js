//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import { Router } from 'express';
import * as movieData from '../data/movies.js';
import * as helper from '../helpers.js';

let router = Router();

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

router.route('/').get(async (req, res) =>
{
  //code here for GET will render the home handlebars file
  try
  {
    res.render('home', {title: "Movie Search"});
  }
  catch(e)
  {
    return res.status(500).send(e);
  }
  
});

router.route('/moviesearch').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  try
  {
    let titleSearch=req.body.searchByTitle;
    if(!titleSearch || titleSearch.trim().length==0)
    {
      return res.status(400).render('./error', { message: `Please type something in the search bar.`});
    }
    helper.titleVerify(titleSearch);
    titleSearch=titleSearch.trim();
    let movies = await movieData.searchMoviesByTitle(titleSearch);

    if (movies.length === 0) {
      return res.status(404).render('./error', { message: `We're sorry, but no results were found for "${titleSearch}".`});
    }
    
    res.render('./searchResults', { title: "Movies Found", titleSearch, movies });
  }
  catch(e)
  {
    return res.status(500).send(e);
  }

});

router.route('/getmovie/:id').get(async (req, res) => {
  //code here for GET a single movie
  let movieId=req.params.id;

  try{
  //helper.idVerify(movieId);
  let movie=await movieData.getMovieById(movieId);
  if(!movie)
  {
    return res.status(404).render('./error', { message: `We're sorry, but no movie was found with the ID "${movieId}".`});
  }

  res.render('getmovie', { title: movie.Title, movie });
  }
  catch(e)
  {
    return res.status(404).render('./error', { message: `We're sorry, but no movie was found with the ID "${movieId}".`});  }
});

export default router
