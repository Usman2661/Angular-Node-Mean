const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.post("", (req,res,next) => {
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

router.get("",(req , res , next) =>{
  const posts = Post.find()
  .then(documents => {

    console.log(documents);

    res.status(200).json({
      message: 'Posts Fetched Success!!',
      posts:documents
    });
  });
})

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);

  const id=req.params.id;

  Post.deleteOne({ _id: id  }).then( result => {
    console.log(result);
    res.status(200).json(
      { message: "Post is deleted!!!"}
    );
  });

});

router.put('/:id' , (req, res,next) => {

  const post = new Post({
    _id : req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id} , post).then(result => {
    res.status(200).json ({message: "Update Successfull!!!"});
  });

});

router.get('/:id', (req, res,next) => {
  Post.findById(req.params.id).then( post => {

    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found!!'});
    }

  });
});

module.exports = router;
