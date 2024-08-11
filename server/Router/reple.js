const express = require('express');
const router = express.Router();

const { Post } = require('../Model/Post');
const { Reple } = require('../Model/Reple');
const { User } = require('../Model/User');

router.post('/submit', (req, res) => {
  let temp = {
    reple: req.body.reple,
    postId: req.body.postId,
  };

  User.findOne({uid: req.body.uid}).exec()
  .then((userInfo) => {
    temp.author = userInfo._id;
    
    const NewReple = new Reple(temp);
    NewReple.save()
      .then(() => {
        Post.findOneAndUpdate({ _id: req.body.postId }, { $inc: { repleNum: 1 } })
          .then(() => {
            return res.status(200).json({success: true});
          });
      });
  })
  .catch((err) => {
    return res.status(400).json({success: false});
  })
});

module.exports = router;