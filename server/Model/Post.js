const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ // 모델에 어떤 데이터들이 들어갈 것인지 정의
  title: String, // 글의 제목
  content: String, // 글의 내용
  postNum: Number, // 글의 고유 번호
  image: String, // 이미지의 경로
}, {collection: 'posts'}); // MongoDB에서 collection이름을 posts라고 지정 (테이블 이름을 posts라고 정했다 보면됨)

const Post = mongoose.model('Post', postSchema); // 모델의 이름 : Post

module.exports = { Post }; // Post 모델을 사용하기 위해 export