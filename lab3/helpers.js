//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

import {getAuthors} from "./authors.js";
import {getBooks} from "./books.js";
import axios from "axios";


export const idVerify =(id) =>
{
    if(id===null) throw "Error, ID cannot be null";
    if(typeof id !== "string") throw "Error, ID must be a string";
    if(id.trim().length == 0) throw "Error, ID cannot be an empty string";
    id=id.trim();
    return id;
}

export const ageVerify=(age1, age2)=>
{
    if(age1==null || age2==null) throw "Error, input cannot be null";
    if(typeof age1 !== "number" || typeof age2 !== "number") throw "Error, age nust be a number";
    if(age1>age2) throw "Error, max age cannot be less then Min age"
    if(age1<=1) throw "Error, min age must be greater than 1";
}

export const pageCountVerify=async (first, last)=>
{
    let data=await getAuthors();
    //let author= await data.find((a) => a.first_name === first && a.last_name === last);
    if(first == null || last == null) throw "Error, entry cannot be null";
    first = first.trim();
    last = last.trim();
    if(typeof(first)!=="string") throw "Error, first name should be a spring";
    if(typeof(last)!=="string") throw "Error, last name should be a spring";
    if(first.length == 0) throw "Error, first name cannot be an empty string";
    if(last.length == 0) throw "Error, last name cannot be an empty string";
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    if(!data.some(author => author.first_name === first)) throw "Error, first name is not in the list of valid authors";
    if(!data.some(author => author.last_name === last)) throw "Error, last name is not in the list of valid authors";
    //if(!author.books || author.books.length==0) throw "Error, author has no books";
};

export const genreVerify=async (genre)=>
{
    let bookData=await getBooks();
    if(genre==null) throw "Error, you gotta enter something";
    genre = genre.trim();
    if(typeof(genre) !== "string") throw "Error, the genre gotta be a stiring";
    if(genre=="" || genre.length==0) throw "Error, you can't just enter spaces";
    //console.log(bookData);
    //console.log(bookData.genres);
    let temp=[];
    bookData.forEach(book=>
    {
        book.genres.forEach(gen=>
        {
            temp.push(gen.toLowerCase());
        });
        
    });
    //console.log(temp);

    //bookdata
    //for each book loop
    //book.genres

    //let temp= bookData.genres.toArray().map(gen=>gen.toLowerCase()).includes(genre);
    //let genreExist=temp;
    //if(!genreExist) throw "Error, the genre doesn't exist";
    if(!temp.includes(genre))
    {
        throw "Error, the genre doesn't exist";
    }
}

export const publishVerify=(pub) =>
{
    if(pub==null) throw "Error, you gotta enter something";
    pub=pub.trim();
    if(typeof(pub) !== "string") throw "Error, the genre gotta be a stiring";
    if(pub=="" || pub.length==0) throw "Error, you can't just enter spaces";
}

export const genPriceVerify=(gen)=>
{
    if(gen==null) throw "Error, input cannot be null";
    gen=gen.trim()
    if(typeof(gen) !== "string") throw "Error, input must be a string";
    if(gen.length ==0|| gen =="") throw "Error, input cannot be empty";
}

export const outputSort = (output) => 
{ 
  let lowerNames = [];
  output.map((name) => 
  {
    lowerNames.push(name.replace(/[^a-zA-Z\s]/g, "").trim());
  })
    lowerNames.sort((a, b) => 
    {
      let splitA=a.split(" ");
      let splitB=b.split(" ");
      let lastNameA = splitA.slice(1).join(" ").toLowerCase();
      let lastNameB = splitB.slice(1).join(" ").toLowerCase();
      return lastNameA.localeCompare(lastNameB);
    });
    return lowerNames.slice();
};