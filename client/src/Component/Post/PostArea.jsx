import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SpinnerDiv } from '../../Style/PostDetailCSS.js';
import Detail from './Detail';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

import RepleArea from '../Reple/RepleArea.jsx';

function PostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let params = useParams(); // 유저가 :postNum 자리에 적은거 가져와줌

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
  
  return (
    <div>
      {
        Flag ?
        (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
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
    </div>
  )
}

export default PostArea;