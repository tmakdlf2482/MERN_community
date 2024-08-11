const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000; // 서버의 포트 (클라이언트 포트는 5173)
const config = require('./config/key.js'); // mongoURI key를 사용하기 위해 import

// 나의 IP : (180.92.83.58)
// MongoDB Username : admin
// MongoDB Password : ekfdls1!8
// mongodb+srv://admin:ekfdls1!8@reactcommunity.02w4ilq.mongodb.net/?retryWrites=true&w=majority&appName=reactcommunity

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/Image', express.static('./Image')); // Image 폴더에 이미지 파일들을 사용하기 위해 express에게 static으로 지정

// body-parsor : 클라이언트에서 body로 전달되는 내용을 서버측에서 parsing
// body-parsor는 express 4.x 버전으로 넘어오면서 express 내장 모듈로 되었음 (따로 설치 불필요)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// post.js에서 export한 router를 사용
app.use('/api/post', require('./Router/post.js')); // /api/post는 공통적으로 routing 규칙이 적용되는 부분
// user.js에서 export한 router를 사용
app.use('/api/user', require('./Router/user.js')); // /api/user는 공통적으로 routing 규칙이 적용되는 부분
// reple.js에서 export한 router를 사용
app.use('/api/reple', require('./Router/reple.js')); // // /api/reple은 공통적으로 routing 규칙이 적용되는 부분

// express 서버가 열리면
// 1. MongoDB와 연결 시도
// 2. DB 연결 성공하면 console.log 2개 출력
// 3. 예상치 못한 에러를 만난 경우 console.log(err) 출력
// 참고로 .then()과 .catch()는 JS의 promise
app.listen(port, () => {
  mongoose.connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log('Connecting MongoDB...');
    })
    .catch((err) => console.log(`${err}`)); // console.log에서 JS변수를 사용가능
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// React에서는 react-router-dom을 이용해서, 라우팅 규칙을 클라이언트 단에서 정의함
// 서버측에서 할 역할은 사용자가 어떠한 요청으로 get요청을 보내든 항상 똑같은 index.html 파일을 띄워줘야함
// *는 모든 것 이라는 자바스크립트 정규식
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// app.post('/api/test', (req, res) => {
//   console.log(req.body);
//   res.status(200).json({success: true, text: '안녕하세요'}); // 200번으로 요청 성공했다고 클라이언트에 알리고, json타입으로 success: true, text: '안녕하세요'를 클라이언트에 보내줌
// });

// app.post('/api/test', (req, res) => {
//   // Post 모델을 새로 만들고 저장하는 방법
//   const CommunityPost = new Post({ title: 'test', content: '테스트입니다!' }); // 클라이언트에서 글의 제목과 내용이 왔다고 가정
//   CommunityPost.save() // MongoDB에 저장
//   .then(() => {
//     res.status(200).json({success: true, text: '안녕하세요'}); // 200번으로 요청 성공했다고 클라이언트에 알리고, json타입으로 success: true, text: '안녕하세요'를 클라이언트에 보내줌
//   });
// });