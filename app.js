const express = require("express");
const booksPath = require("./routes/books");


//Init app
const app = express();

// Apply Middlewares
app.use(express.json());

app.use("/api/books",booksPath);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
