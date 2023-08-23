const express = require("express");
const router = express.Router();

const Joi = require("joi");

const books = [
  {
    id: 1,
    title: "Book1",
    author: "B1",
    description: "About B1",
    price: 10,
    cover: "cover",
  },
  {
    id: 2,
    title: "Book2",
    author: "B2",
    description: "About B2",
    price: 12,
    cover: "cover",
  },
];

/**
 *      @desc   Get all books
 *      @route  /api/books
 *      @method GET
 *      @access public
 */

// Http Methods / Verbs

router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 *      @desc   Get book by id
 *      @route  /api/books/:id
 *      @method GET
 *      @access public
 */

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

/**
 *      @desc   Create new book
 *      @route  /api/books
 *      @method POST
 *      @access public
 */

router.post("/", (req, res) => {

    const {error} = validateCreateBook(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book);
});

// Validate Create Book

function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  return schema.validate(req.body);
}

module.exports = router;
