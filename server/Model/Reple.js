const mongoose = require('mongoose');

const repleSchema = new mongoose.Schema({ // 모델에 어떤 데이터들이 들어갈 것인지 정의
  reple: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    /* ref를 설정해 주지 않는 이유 : 단순히 어떠한 post에 등록되어 있는지만 확인하려고
    -> reple에서 post정보를 가져올 필요가 없음 */
  },
}, {collection: 'reples'}); // MongoDB에서 collection이름을 reples라고 지정 (테이블 이름을 reples라고 정했다 보면됨)

const Reple = mongoose.model('Reple', repleSchema); // 모델의 이름 : reple

module.exports = { Reple }; // reple 모델을 사용하기 위해 exporte