const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

const postsRoutes = require ("./routes/posts")
const userRoutes = require ("./routes/user")


app.use(bodyParser.json());




mongoose.connect("mongodb+srv://usman:pakistan2546@cluster0-qklz2.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to the database!!!');
})
.catch((error)=>{
  console.log('Connection Failed!!!');
  console.log(error);

});

// DB Password 19v3u7nAokDvLKTO

//Giving access to the images

app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin , X-Requested-With, Content-Type, Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET , POST , PUT , PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes );
app.use("/api/user", userRoutes );

module.exports = app;
