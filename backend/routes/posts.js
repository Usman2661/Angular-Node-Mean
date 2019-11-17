const express = require("express");
const Post = require("../models/post");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const PostController = require ("../controllers/posts")

const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image.jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid){
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-'+ Date.now()+ '.'+ext)
  }
});

router.post("", checkAuth, multer({storage: storage}).single("image") , PostController.createPost);
router.get("", PostController.getPosts )
router.delete('/:id', checkAuth, PostController.deletePost);
router.put('/:id' , checkAuth,  multer({storage: storage}).single("image") , PostController.updatePost);
router.get('/:id', PostController.getPost );

module.exports = router;
