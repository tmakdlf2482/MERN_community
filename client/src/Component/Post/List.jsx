import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { ListDiv, ListItem } from '../../Style/ListCSS.js';

import moment from 'moment';
import 'moment/locale/ko'; // 한국으로 설정

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format('YYYY.M.D. hh:mm') + '(수정됨)';
    }
    else {
      return moment(a).format('YYYY.M.D. hh:mm');
    }
  };

  // const [PostList, setPostList] = useState([]);

  // const [Text, setText] = useState('');

  // useEffect(() => {
  //   // 클라이언트 -> 서버로 데이터 보내기
  //   let body = {
  //     text: "client to server",
  //   };

  //   axios.post('/api/test', body) // 서버측에서도 /api/test 요청을 구현해야 함
  //     .then((response) => {
  //       // alert('요청성공!');
  //       console.log(response);
  //       setText(response.data.text);
  //     })
  //     .catch((error) => {
  //       // alert('요청실패!');
  //       console.log(error);
  //     })
  // }, []); // List가 렌더링되었을 때 1번만 실행

  // useEffect(() => {
  //   axios.post('/api/post/list')
  //   .then((response) => {
  //     // console.log(response.data);

  //     if (response.data.success) {
  //       setPostList([...response.data.postList]);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  // console.log(PostList);
  
  return (
    <ListDiv>
      {props.PostList.map((post, index) => {
          console.log(post); // author로 유저의 정보가 넘어옴
          return (
            <ListItem key={index}>
              <Link to={`/post/${post.postNum}`}>
                <p className='title'>{post.title}</p>
                <div className='author'>
                  <div>
                    <Avatar size='40' round={true} src={post.author.photoURL} style={{border: '1px solid #c6c6c6'}} />
                    <p>{post.author.displayName}</p>
                  </div>
                  <p className='time'>
                    {SetTime(post.createdAt, post.updatedAt)}
                  </p>
                </div>
                <p>{post.content}</p>
              </Link>
            </ListItem>
          );
        })
      }
    </ListDiv>
  )
}

export default List;