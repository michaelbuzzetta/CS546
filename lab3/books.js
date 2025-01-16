//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

import * as helper from "./helpers.js";
import * as author from "./authors.js";
import axios from "axios";

export async function getBooks() 
{
  const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
  return data; // this will be the array of book objects
}

export const getBookById = async (id) =>
{
  helper.idVerify(id);
  id=id.trim();
  let data= await getBooks();

  let output;
    for(let book of data)
    {
        if(book.id==id)
        {
            output= book;
            break;
        }
    }
    if(output==null) throw "Error, ID not found";
    return output;

};

export const booksByFormat = async () =>
{
  let data= await getBooks();
  let formatCount = {};

    data.forEach(book => 
    {
        book.format.forEach(type =>
        {
          if (type in formatCount) 
          {
            formatCount[type] += 1;
          } 
          else 
          {
            formatCount[type] = 1;
          }
        });
    });

    return formatCount;
};

export const mostPopularGenre = async () => 
{
  let data = await getBooks();

  let genreCount ={};
  data.forEach(books=>
  {
    let genres=books.genres;
    genres.forEach(genre => 
    {
      if(!genreCount[genre])
      {
        genreCount[genre]=1;
      }
      else
      {
        genreCount[genre]++;
      }
    })
  });

  let maxCount = 0;
  let output = [];

  for (let [genre, count] of Object.entries(genreCount)) 
  {
      if (count > maxCount) 
      {
        maxCount = count;
        output.length = 0;
        output.push(genre);
      } 
      else if (count === maxCount) 
      {
        output.push(genre);
      }
  }

  if (output.length > 1) 
  {
    return helper.outputSort(output);
  } 
  else 
  {
    return output[0];
  }
};

export const booksByPublisher = async (publisher) =>
{
  helper.publishVerify(publisher);
  let bookData=await getBooks();
  publisher=publisher.trim();
  let output=[];

  bookData.forEach(book =>
  {
    if(publisher.toLowerCase()==book.publisher.toLowerCase())
    {
      output.push(book);
    }
  });
  if(output.length == 0)
  {
    throw "Error, no publisher found";
  }
  return output;
};

export const averagePriceByGenre = async (genre) =>
{
  helper.genPriceVerify(genre);
  genre=genre.trim();
  let bookData=await getBooks();
  let genTrack=[];
  let total;
  let output;

  bookData.forEach(book=>
  {
    book.genres.forEach(gen=>
    {
      if(genre.toLowerCase()==gen.toLowerCase())
      {
        genTrack.push(gen);
        //console.log(book.price);
        total = total + book.price || book.price;
      }
    }
    )
  });
  if(genTrack.length==0)
  {
    throw "Error, no books in that genre";
  }

  output=total/genTrack.length;
  //output=Math.round(output*100)
  return parseFloat(output.toFixed(2));
};
