const express = require("express");

//Init app
const app = express();


// Apply Middlewares
app.use(express.json());

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

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});


app.post("/api/books", (req,res) =>{
    console.log(req.body);
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    }

    books.push(book);
    res.status(201).json(book);
})

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
