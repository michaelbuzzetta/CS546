//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import axios from "axios";
 

const getAuthors = async () => 
{
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
  );
  return data; // this will be the array of author objects
};

const getBooks = async () => 
{
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
  );
  return data;
};

export const validAuthorID = async (id) =>
{
  let authorData = await getAuthors();
  id = id.trim();
  let authorIds = authorData.map((author) => author.id);
  if (authorIds.includes(id)) 
  {
    return true;
  } 
  else 
  {
    return false;
  }
  //return authorIds.includes(id);
};

export const validBookID = async (id) =>
{
  let bookData = await getBooks();
  id = id.trim();
  let bookIDs = bookData.map((book) => book.id);
  if (bookIDs.includes(id)) 
  {
    return true;
  } 
  else 
  {
    return false;
  }
  //return bookIDs.includes(id);
};

export const idVerify = (id) => 
{
  if (id === null) throw "Error, ID cannot be null";
  if (typeof id !== "string") throw "Error, ID must be a string";
  id = id.trim();
  if (id.length == 0) throw "Error, ID cannot be an empty string";
  return id;
};
