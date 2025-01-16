/*Here, you can export the data functions
to get the authors, books, getAuthorByID, getBookById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import axios from "axios";
import * as helper from "../helpers.js";

const getAuthors = async () => 
{
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
  );
  return data;
};

const getBooks = async () =>
{
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
  );
  return data;
};

const getAuthorById = async (id) => 
{
  helper.idVerify(id);
  id=id.trim();
  let authorID= await helper.validAuthorID(id);
  if(authorID==false) throw "Error, no author tied to that ID";
  let data = await getAuthors();
  let output;
  for (let author of data) 
  {
    if (author.id == id) 
    {
      output = author;
      break;
    }
  }
  if (output == null) throw "Error, ID not found";
  return output;
};

const getBookById = async (id) => 
{
  helper.idVerify(id);
  id=id.trim();
  let bookID = await helper.validBookID(id);
  if(bookID==false) throw "Error, no books tied to that ID";
  let data = await getBooks();
  let output;
  for (let book of data)
  {
    if (book.id == id) 
    {
      output = book;
      break;
    }
  }
  if (output == null) throw "Error, ID not found";
  return output;
};
export {getAuthorById, getBookById, getAuthors, getBooks};