import axios from "axios";

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

const getMovies = async () => {
  const { data } = await axios.get("http://www.omdbapi.com/?apikey=CS546&");
  return data; // this will be the array of author objects
};

export const titleVerify = (title) => {
  if (!title) {
    throw "Error, title needs to be defined";
  }
  if (title == null) {
    throw "Error, title cannot be null";
  }
  if (typeof title !== "string") {
    throw "Error, title needs to be a string";
  }
  title = title.trim();
  if (title.length == 0 || title == "") {
    throw "Error, title cannot be empty or just spaces";
  }
  return title;
};

export const idVerify = (id) => 
{
  if (id == null || !id) throw "Error, ID cannot be null";
  if (typeof id !== "string") throw "Error, ID must be a string";
  id = id.trim();
  if (id.length == 0) throw "Error, ID cannot be an empty string";
  return id;
};