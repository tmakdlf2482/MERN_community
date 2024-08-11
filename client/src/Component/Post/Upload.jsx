import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 현재 유저의 로그인 정보를 불러옴
import { UploadDiv, UploadForm, UploadButtonDiv } from '../../Style/UploadCSS.js';
import axios from 'axios';
import ImageUpload from './ImageUpload.jsx';

function Upload(props) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.accessToken) {
      alert('로그인한 회원만 글을 작성할 수 있습니다.');
      navigate('/login');
    }
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault(); // 버튼을 눌렀을 때 새로고침 되지 않음

    if (Title === "" || Content === "") {
      return alert('모든 항목을 채워주세요!');
    }

    // 클라이언트 -> 서버로 데이터 보내기
    let body = {
      title: Title,
      content: Content,
      image: Image, // image: 이거는 Post모델(Post.js)에서 image: String 이거임
      uid: user.uid, // firebase에서 부여하는 사용자의 고유 id
    };

    axios.post('/api/post/submit', body)
    .then((response) => {
      if (response.data.success) {
        alert('글 작성이 완료되었습니다.');
        navigate('/');
      }
      else {
        alert('글 작성에 실패하였습니다.');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input id='title' type="text" value={Title} onChange={(e) => {setTitle(e.target.value)}} />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea id='content' value={Content} onChange={(e) => {setContent(e.target.value)}}/>
        <UploadButtonDiv><button onClick={(e) => { onSubmit(e) }}>제출</button></UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  )
}

export default Upload