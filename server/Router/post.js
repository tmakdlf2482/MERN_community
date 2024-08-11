const express = require('express');
const router = express.Router();
const multer  = require('multer');
const setUpload = require('../Util/upload.js');

// Counter모델과 Post모델을 사용함
// Community Post에 CRUD 기능을 구현하기 전에 하는 작업
// Post : 커뮤니티에 유저들이 저장하는 글, Post MongoDB Model 필요
const { Post } = require('../Model/Post.js') // Post.js 에서 export한 Post 모델을 받아오는 과정

// 새로운 모델을 불러옴
const { Counter } = require('../Model/Counter.js');
const { CognitoIdentity } = require('aws-sdk');
const { User } = require('../Model/User.js')

// app.post를 router.post로 모조리 바꿔주기!
router.post('/submit', (req, res) => { // 원래 /api/post/submit 이였음, 하지만 index.js 20번째 줄에서 /api/post를 정의해 줬음, 따라서 /submit만 남김
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image, // image: 이거는 Post모델(Post.js)에서 image: String 이거임
  };

  // console.log(temp);

  // findOne은 find 메소드에서 조회할 때 가장 첫번째 배열 데이터 한개만 조회
  // findOne안에 { name : 'counter' } 조건을 줄 수 있음 (MongoDB 사이트에서 INSERT DOCUMENT로 name: 'counter'와 postNum: 1로 부여해줬음)
  Counter.findOne({ name: 'counter' }).exec()
    .then((counter) => { // 여기서 counter는 Counter collection(table)에서 1개의 document(row/tuple)가 배열형태로 담김
      temp.postNum = counter.postNum; // temp는 title과 content밖에 없으므로, postNum을 찾아줘야 함
      // console.log(temp);
      // console.log(counter);

      User.findOne({uid: req.body.uid}).exec()
      .then((userInfo) => {
        temp.author = userInfo._id;
        const CommunityPost = new Post(temp);
        CommunityPost.save()
          .then(() => {
            // updateOne({어떤 document를 업데이트 시킬것인지 선택}, {어떻게 업데이트를 시킬 것인지 선택})
            Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } }) // name 필드가 'counter'인 postNum값을 1씩 더해줌
              .then(() => {
                res.status(200).json({ success: true });
              });
          });
      })
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/list', (req, res) => { // 원래 /api/post/list 이였음, 하지만 index.js 20번째 줄에서 /api/post를 정의해 줬음, 따라서 /list만 남김
  Post.find()
    .populate('author')
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/detail', (req, res) => { // 원래 /api/post/detail 이였음, 하지만 index.js 20번째 줄에서 /api/post를 정의해 줬음, 따라서 /detail만 남김
  Post.findOne({postNum: Number(req.body.postNum)})
  .populate('author')
  .exec() // Post Document에 있는 postNum과 req.body.postNum이 일치하는 것을 찾기
  .then((doc) => {
    // console.log(doc);
    res.status(200).json({success: true, post: doc});
  })
  .catch((err) => {
    res.status(400).json({success: false});
  });
});

router.post('/edit', (req, res) => { // 원래 /api/post/edit 이였음, 하지만 index.js 20번째 줄에서 /api/post를 정의해 줬음, 따라서 /edit만 남김
  let temp = { // 교체를 해주는 변수
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };

  Post.updateOne({postNum: Number(req.body.postNum)}, {$set: temp}).exec()
  .then(() => {
    res.status(200).json({success: true});
  })
  .catch((err) => {
    res.status(400).json({success: false});
  });
});

router.post('/delete', (req, res) => { // 원래 /api/post/delete 이였음, 하지만 index.js 20번째 줄에서 /api/post를 정의해 줬음, 따라서 /delete만 남김
  Post.deleteOne({postNum: Number(req.body.postNum)}).exec() // Post Document에 있는 postNum과 req.body.postNum이 일치하는 것을 찾기
  .then(() => {
    res.status(200).json({success: true});
  })
  .catch((err) => {
    res.status(400).json({success: false});
  });
});

/*
// diskStorage는 Multer를 통해서 전달받은 파일 객체를 나의 disk에 저장하겠다.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Image/'); // 어떤 경로에 저장할지 지정(image라는 폴더를 만들어서 저장)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // 어떤 이름으로 저장할지 지정
  },
});

// upload 함수를 통해 이미지 저장
const upload = multer({ storage: storage }).single('file'); // .single('file')은 파일을 1개만 저장할 것임을 명시

router.post('/image/upload', (req, res) => {
  // {} undefined가 나옴, 이를 해결하기 위해 Multer 라이브러리를 설치
  // Multer 라이브러리는 multipart/form-data를 통해서 보내진 파일의 이름을 바꾸거나 파일을 저장하는 등을 도와주는 라이브러리
  // FormData를 통해서 이미지 파일을 전송했기 때문에 Multer를 사용할 수 있음
  // console.log(req.body, req.formData);
  upload(req, res, err => {
    if (err) {
      // console.log(err);
      // res.status(400).json({success: false});
    }
    else {
      // console.log(res.req.file); // 이해안되는 코드
      res.status(200).json({success: true, filePath: res.req.file.path});
    }
  });
});
*/

router.post('/image/upload', setUpload('react-community5/post'), (req, res, next) => {      
  // console.log(res.req); // file: { location: '' } 을 찾기 위해 로그 찍어줌
  res.status(200).json({success: true, filePath: res.req.file.location});
});

module.exports = router; // index.js에서 사용하기 위해 export 해줌