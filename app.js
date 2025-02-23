const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');


app.use(
  cors({
    origin: ["http://localhost:5173","https://health-tracker-one-orcin.vercel.app/"], // Frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json("Hello, Server is Running!");
});
app.use('/user', userRoutes);
module.exports = app;