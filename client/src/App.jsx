import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice.js';
import firebase from './firebase'; // 로그인 추적

import Heading from './Component/Heading';
import List from './Component/Post/List';
import Upload from './Component/Post/Upload';
import PostArea from './Component/Post/PostArea';
// import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

function App() {
  let dispatch = useDispatch();
  // const user = useSelector(state => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
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
        <Route path="/" element={<List />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<PostArea />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App