import React, { useState, useEffect } from 'react';
import List from './Post/List.jsx';
import axios from 'axios';

import { Dropdown, DropdownButton } from 'react-bootstrap';
import { GNBDiv, FooterDiv } from "../Style/MainPageCSS.js";

function MainPage() {
  const [PostList, setPostList] = useState([]);
  const [Sort, setSort] = useState('최신순');
  const [SearchTerm, setSearchTerm] = useState('');
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);
  
  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };

    axios.post('/api/post/list', body)
    .then((response) => {
      // console.log(response.data);

      if (response.data.success) {
        setPostList([...PostList, ...response.data.postList]);
        setSkip(Skip + response.data.postList.length);
        // 0번째 idx ~ 4번째 idx 까지 들고옴 : limit(5)만큼 skip 해야함
        // 5번째 idx ~ 9번째 idx 까지 들고와야함
        // 10번째 idx ~ 14번째 idx 까지 들고와야함 : 10
        if (response.data.postList.length < 5) {
          setLoadMore(false);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getPostList = () => {
    setSkip(0);

    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };

    axios.post('/api/post/list', body)
    .then((response) => {
      // console.log(response.data);

      if (response.data.success) {
        setPostList([...response.data.postList]);
        setSkip(response.data.postList.length);
        // 0번째 idx ~ 4번째 idx 까지 들고옴 : limit(5)만큼 skip 해야함
        // 5번째 idx ~ 9번째 idx 까지 들고와야함
        // 10번째 idx ~ 14번째 idx 까지 들고와야함 : 10
        if (response.data.postList.length < 5) {
          setLoadMore(false);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <div>
      <GNBDiv>
        <div className='search'>
          <input type="text" value={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {if(e.keyCode === 13) SearchHandler()}} />
          <button onClick={() => SearchHandler()}>
            <i className="bi bi-search"></i>
          </button>
        </div>
        <DropdownButton variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort('최신순')}>최신순</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort('인기순')}>인기순</Dropdown.Item>
        </DropdownButton>
      </GNBDiv>   
      <List PostList={PostList} />
      {
        LoadMore &&
        (
          <FooterDiv>
            <button style={{ marginBottom: '10vh' }} onClick={() => getLoadMore()}>더보기</button>
          </FooterDiv>
        )
      }
    </div>
  );
}

export default MainPage;