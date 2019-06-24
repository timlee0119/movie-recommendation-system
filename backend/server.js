const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();
// const todoRoutes = express.Router();
const movieRouter = require('./routers/movie-router');
const userRouter = require('./routers/user-router');

mongoose.connect('mongodb://127.0.0.1:27017/movie-recommendation-system', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
