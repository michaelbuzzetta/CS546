/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthorById("123");
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as author from "./authors.js";
import * as book from "./books.js";

/*
CAs that helped
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
Jack Gibson
Bernard Vitale
*/

try
{
    console.log(await author.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"));
}
catch (e)
{
    console.log(e);
}
try
{
    console.log(await author.getAuthorById("greetings and salutations"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.averagePageCount("Madelaine", "Armatage"));
}
catch (e)
{
    console.log(e);
}
try
{
    console.log(await author.averagePageCount("Mayer", "Staddart"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.getAuthorsByAgeRange(20, 115));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.getAuthorsByAgeRange(30, 12));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.authorsMultipleGenres());
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.authorsByGenre("horror"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await author.authorsByGenre("test"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.getBookById("test"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.booksByFormat());
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.mostPopularGenre());
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.booksByPublisher("Skilith"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.booksByPublisher("test"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.averagePriceByGenre("horror"));
}
catch(e)
{
    console.log(e);
}
try
{
    console.log(await book.averagePriceByGenre("test"));
}
catch(e)
{
    console.log(e);
}