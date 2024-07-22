const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // 모델에 어떤 데이터들이 들어갈 것인지 정의
  userNum: Number, // 사용자의 고유 번호
  displayName: String, // 사용자의 이름
  email: String, // 사용자의 이메일
  uid: String, // 사용자별 uid
}, {collection: 'users'}); // MongoDB에서 collection이름을 posts라고 지정 (테이블 이름을 posts라고 정했다 보면됨)

const User = mongoose.model('User', userSchema); // 모델의 이름 : Post

module.exports = { User }; // Post 모델을 사용하기 위해 export