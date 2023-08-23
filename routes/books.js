const express = require("express");
const router = express.Router();


const Joi = require('joi');

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

// Http Methods / Verbs

router.get("/", (req, res) => {
  res.status(200).json(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  const { error } = schema.validate(req.body);

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

module.exports = router;