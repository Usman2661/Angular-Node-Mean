const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const app = express();

const postsRoutes = require ("./routes/posts")

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

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin , X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET , POST , PUT , PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes );

module.exports = app;
