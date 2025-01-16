//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes
//You can import your getBooks() function in the /data/data.js file to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import express from "express";
import * as bookData from '../data/data.js';
import * as helper from "../helpers.js";


const router = express.Router();

router.route('/')
// Implement GET Request Method and send a JSON response  See lecture code!
.get(async (req, res) => {
    try 
    {
      const bookList = await bookData.getBooks();
      return res.json(bookList);
    } catch (e) {
      return res.status(500).send(e);
    }
  });

router.route('/:id')
// Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => 
{
    try 
    {
      req.params.id = helper.idVerify(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const books = await bookData.getBookById(req.params.id);
      return res.json(books);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

export default router;
