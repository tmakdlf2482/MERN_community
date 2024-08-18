import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UploadDiv, UploadForm, UploadButtonDiv } from '../../Style/UploadCSS.js';
import ImageUpload from './ImageUpload.jsx';

function Edit() {
  let params = useParams(); // 유저가 :postNum 자리에 적은거 가져와줌
  // console.log(params);
  // console.log(params.postNum);
  // console.log(typeof(params.postNum)); // string
  let navigate = useNavigate();

  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false); // 많은 post들로 인해 서버와의 통신이 길어질 때
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState(PostInfo.image);

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios.post('/api/post/detail', body)
      .then((response) => {
        if (response.data.success) {
          // console.log(response);
          // console.log(response.data.post);
          setPostInfo(response.data.post); // 이러면 PostInfo.title, PostInfo.content, PostInfo.postNum 을 쓸 수 있음
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setImage(PostInfo.image);
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault(); // 버튼을 눌렀을 때 새로고침 되지 않음

    if (Title === "" || Content === "") {
      return alert('모든 항목을 채워주세요!');
    }

    // 클라이언트 -> 서버로 데이터 보내기
    let body = {
      title: Title,
      content: Content,
      image: Image,
      postNum: params.postNum, // 서버측에서도 어떤 글을 수정해야 하는지 알아야 함, params.postNum은 string임
    };

    axios.post('/api/post/edit', body)
      .then((response) => {
        if (response.data.success) {
          alert('글 수정이 완료되었습니다.');
          navigate(`/post/${params.postNum}`);
        }
        else {
          alert('글 수정에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input id='title' type="text" defaultValue={PostInfo.title} onChange={(e) => { setTitle(e.target.value) }} />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea id='content' value={Content} onChange={(e) => { setContent(e.target.value) }} />
        <UploadButtonDiv>
          {/* naviate(-1)은 뒤로가기 기능 */}
          {/* 취소 버튼은 폼에 종속되어 있어서 취소 버튼을 클릭하는 순간 새로고침이 됨, 새로고침 상태에서 한번 뒤로가기 하면 다시 원래 페이지가 됨 */}
          {/* 따라서 e.preventDefault()를 해줘야 함 */}
          <button className='cancel' onClick={(e) => { e.preventDefault(); navigate(-1); }}>취소</button>
          <button onClick={(e) => { onSubmit(e) }}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  )
}

export default Edit