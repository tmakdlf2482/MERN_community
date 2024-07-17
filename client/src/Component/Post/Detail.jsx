import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PostDiv, SpinnerDiv, Post, BtnDiv } from '../../Style/PostDetailCSS.js';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

function Detail() {
  let params = useParams(); // 유저가 :postNum 자리에 적은거 가져와줌
  let navigate = useNavigate();
  // console.log(params);
  // console.log(params.postNum);
  // console.log(typeof(params.postNum)); // string
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false); // 많은 post들로 인해 서버와의 통신이 길어질 때 

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

  // PostInfo에 잘 담겼는지 확인용
  useEffect(() => {
    // console.log(PostInfo);
  }, [PostInfo]); // PostInfo 가 바뀔때마다 재렌더링

  const DeleteHandler = () => {
    // 사용자에게 확인, 취소를 묻는 confirm 창 (javascript)
    if (window.confirm('정말로 삭제하시겠습니까?')) { // 확인 버튼을 눌렀을 때 (삭제)
      let body = {
        postNum: params.postNum,
      };

      axios.post('/api/post/delete', body)
        .then((response) => {
          if (response.data.success) {
            // console.log(response);
            // console.log(response.data.post);
            alert('게시글이 삭제되었습니다.');
            navigate('/');
          }
        })
        .catch((err) => {
          alert('게시글 삭제에 실패하였습니다.');
        });
    }
    // else { // 취소 버튼을 눌렀을 때
    //   alert('삭제되지 않았습니다.');
    // }
  };

  return (
    <PostDiv>
      { // Flag가 true이면 axios 통신이 끝났다(PostInfo 데이터가 서버에서 프론트쪽으로 넘어왔다)는 뜻이고,
        // Flag가 false이면 axios 통신이 덜 끝남(PostInfo 데이터가 서버에서 프론트쪽으로 아직 넘어오지 못함)
        Flag ? (
          <>
            <Post>
              <h1>{PostInfo.title}</h1>
              {/* PostInfo에 이미지가 있는지 없는지부터 체크  */}
              {
                PostInfo.image ? <img src={PostInfo.image} alt="" style={{width: "100%", height: "auto"}} /> : null
              }
              <p>{PostInfo.content}</p>
            </Post>
            <BtnDiv>
              <Link to={`/edit/${PostInfo.postNum}`}>
                <button className='edit'>수정</button>
              </Link>
              <button className='delete' onClick={() => { DeleteHandler() }}>삭제</button>
            </BtnDiv>
          </>
        )
          :
          (
            <SpinnerDiv>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </SpinnerDiv>
          )
      }
    </PostDiv>
  );
}

export default Detail