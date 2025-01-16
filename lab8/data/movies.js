//import axios

import axios from "axios";
import * as helper from "../helpers.js";
/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

const API_KEY = "CS546";
const BASE_URL = "http://www.omdbapi.com/";

export const searchMoviesByTitle = async (title) => {
  /*Function to make an axios call to search the api and return up to 50 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  helper.titleVerify(title);
  let movies = [];
  title = title.trim();
  for (let x = 1; x <= 5; x++) 
  {
    try{
      let {data} = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${title}&page=${x}`);

      if (data.Response == "True") 
      {
        movies = movies.concat(data.Search);
      } 
      else
      {
        break;
      }

      if(movies.length>=50)
      {
        movies.slice(0,50);
      }
    }
    catch(e)
    {
      throw "Error, no movies found";
    }
  }

  return movies;
};

export const getMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  helper.idVerify(id)
  id=id.trim();
  try
  {
    let {data}=await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);

    if(data.Response=="True")
    {
      return data;
    }
    else
    {
      throw "No movie by that ID";
    }
  }
  catch(e)
  {
    throw "Error, no movie";
  }

};
