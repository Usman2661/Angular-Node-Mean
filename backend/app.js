const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')
const app = express();

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

app.post('/api/posts', (req,res,next) => {

  const post= new Post ({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost =>{
    console.log(createdPost);
    res.status(201).json({
      message: 'Post Added Successfully',
      postId : createdPost._id
    });
  });



});

app.get('/api/posts',(req , res , next) =>{

  const posts = Post.find()
  .then(documents => {

    console.log(documents);

    res.status(200).json({
      message: 'Posts Fetched Success!!',
      posts:documents
    });
  });
})

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);

  const id=req.params.id;

  Post.deleteOne({ _id: id  }).then( result => {
    console.log(result);
    res.status(200).json(
      { message: "Post is deleted!!!"}
    );
  });

});

app.put('/api/posts/:id' , (req, res,next) => {

  const post = new Post({
    _id : req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id} , post).then(result => {
    res.status(200).json ({message: "Update Successfull!!!"});
  });

});

app.get('/api/posts/:id', (req, res,next) => {
  Post.findById(req.params.id).then( post => {

    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!!'});
    }

  });
});

module.exports = app;
