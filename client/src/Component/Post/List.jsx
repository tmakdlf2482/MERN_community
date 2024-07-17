import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListDiv, ListItem } from '../../Style/ListCSS.js';

function List(props) {
  const [PostList, setPostList] = useState([]);

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

  useEffect(() => {
    axios.post('/api/post/list')
    .then((response) => {
      // console.log(response.data);

      if (response.data.success) {
        setPostList([...response.data.postList]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // console.log(PostList);
  
  return (
    <ListDiv>
      {PostList.map((post, index) => {
          return (
            <ListItem key={index}>
              <Link to={`/post/${post.postNum}`}>
                <p className='title'>{post.title}</p>
                <p>{post.content}</p>
              </Link>
            </ListItem>
          );
        })
      }
    </ListDiv>
  )
}

export default List