const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')
const app = express();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://usman:pakistan2546@cluster0-qklz2.mongodb.net/test?retryWrites=true&w=majority")
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
  res.setHeader("Access-Control-Allow-Methods","GET , POST , PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req,res,next) => {

  const post= new Post ({
    title: req.body.title,
    content: req.body.content
  });

  console.log(post);
  res.status(201).json({
    message: 'Post Added Successfully'
  });

});

app.use('/api/posts',(req , res , next) =>{
  const posts = [
    {
      id:'767h8has8ash',
    title: 'first server-side post',
    content: 'This is coming from the node.js server'
   },
    {
      id:'yaay88yasb8',
    title: 'second server-side post',
    content: 'This second is coming from the node.js server'
    }
  ];
  res.status(200).json({
    message: 'Posts Fetched Success!!',
    posts:posts
  });
})

module.exports = app;
