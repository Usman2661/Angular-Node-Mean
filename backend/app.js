const express = require('express');
const bodyParser = require ('body-parser');

const app = express();

app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin , X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET , POST , PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req,res,next) => {

  const post= req.body;
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
