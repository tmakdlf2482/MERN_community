import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice.js';
import firebase from './firebase'; // 로그인 추적

import Heading from './Component/Heading';
import MainPage from './Component/MainPage';

import Upload from './Component/Post/Upload';
import PostArea from './Component/Post/PostArea';
// import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import MyPage from './Component/User/MyPage';

function App() {
  let dispatch = useDispatch();
  // const user = useSelector(state => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo);
      // console.log("userInfo : ", userInfo); // 로그아웃, 로그인 하지 않았을 경우 null 출력 / 로그인 했다면 로그인된 상태정보 출력
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      }
      else {
        dispatch(clearUser()); // 초기화
      }
    });
  }, []);

  // useEffect(() => {
  //   firebase.auth().signOut(); // 로그아웃
  // }, []);

  // useEffect(() => {
  //   console.log("user : ", user);
  // }, [user]);
  
  return (
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        {/* Post, Reple */}
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<PostArea />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>

        {/* User */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>

        {/* 
        1. 검색
        2. 유저 프로필 이미지 + 원하는 이미지로 바꾸기
        3. 정렬 (최신순 / 인기순 : repleNum)
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App