const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: String,     // document 추적하기 위함
  postNum: Number,  // 각각의 post마다 번호 부여
  userNum: Number,  // 각각의 user마다 번호 부여
}, {collection: 'counter'});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = { Counter };