//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

import * as helper from "./helpers.js";
import * as books from "./books.js";

//you must use axios to get the data
import axios from 'axios';
export async function getAuthors() 
{
  const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
  return data; // this will be the array of author objects
}

export const getAuthorById = async (id) =>
{
    helper.idVerify(id);
    id=id.trim();
    let data=await getAuthors();
    let output;
    for(let author of data)
    {
        if(author.id==id)
        {
            output= author;
            break;
        }
    }
    if(output==null) throw "Error, ID not found";
    return output;
};

export const authorsMultipleGenres = async () =>
{
    let authorData=await getAuthors();
    let bookData = await books.getBooks();
    let output = [];
    
    for (let author of authorData) 
    {
        let genreCount=[];
        let fullName = `${author.first_name} ${author.last_name}`;

        for (let bookId of author.books) 
        {
            let book = await books.getBookById(bookId);
            genreCount=book.genres;
            if(genreCount.length>1)
            {
                if(!output.includes(fullName))
                {
                    output.push(fullName);
                }
                break;
            }
        }
    }

    let newOutput=helper.outputSort(output);
    return newOutput;
};

export const averagePageCount = async (firstName, lastName) => 
{
    helper.pageCountVerify(firstName, lastName);
    let data=await getAuthors();
    firstName=firstName.trim();
    lastName=lastName.trim();
    let totalPageCount=0;
    let author=data.find((a) => a.first_name === firstName && a.last_name === lastName);
    for (let bookId of author.books)
    {
        let book = await books.getBookById(bookId);
        if (book && book.pageCount) 
        {
            totalPageCount += book.pageCount;
        }
    }
    if(author.books.length==1)
    {
        return totalPageCount;
    }
    else if(author.books.length==0)
    {
        return 0;
    }
    else
    {
        let output = totalPageCount / author.books.length;
        return output;
    }
};

export const getAuthorsByAgeRange = async (minAge, maxAge) =>
{
    helper.ageVerify(minAge, maxAge);
    let data=await getAuthors();
    let date= new Date();
    let output=[];
    let dob;
    let age;
    for(let i=0; i<data.length; i++)
    {
        dob = new Date(data[i]["date_of_birth"]);
        if(dob.getMonth()>date.getMonth())
        {
            age=date.getFullYear()-dob.getFullYear();
            if(age>minAge && age<maxAge)
            {
                output.push(data[i]);
            }
        }
        else if(dob.getMonth()==date.getMonth())
        {
            if(dob.getDay()>date.getDay())
            {
                age=date.getFullYear()-dob.getFullYear();
                if(age>minAge && age<maxAge)
                {
                    output.push(data[i]);
                }
            }
            else
            {
                age=date.getFullYear()-dob.getFullYear()-1;
                if(age>minAge && age<maxAge)
                {
                    output.push(data[i]);
                }
            }
        }
        else
        {
            age=date.getFullYear()-dob.getFullYear()-1;
            if(age>minAge && age<maxAge)
            {
                output.push(data[i]);
            }
        }
    }
    if(output.length==0)
    {
        throw "Error, theres no authors who fit the age range";
    }
    return output;
};

//HELP
export const authorsByGenre = async (genre) =>
{
    await helper.genreVerify(genre);
    
    let authorData=await getAuthors();
    let bookData=await books.getBooks();
    genre.trim();
    let authors = new Set();

    for (let book of bookData) 
    {
        if (book.genres && book.genres.map(g => g.toLowerCase()).includes(genre)) 
        {
            let author = authorData.find(a => a.id === book.authorId);
            if (author) 
            {
                authors.add(`${author.first_name} ${author.last_name}`);
            }
        }
    }
    let temp=Array.from(authors);
    let output = helper.outputSort(temp);
    return output;
};
