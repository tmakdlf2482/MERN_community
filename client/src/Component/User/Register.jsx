import React, { useState } from 'react'
import LoginDiv from '../../Style/UserCSS';

import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();

    if (!(Name && Email && PW && PWConfirm)) {
      return alert('모든 값을 채워주세요!');
    }
    if (PW != PWConfirm) {
      return alert('비밀번호와 비밀번호 확인 값은 같아야 합니다!');
    }
    
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, PW); // firebase가 회원가입 될떄 까지 잠시 대기

    await createdUser.user.updateProfile({
      displayName: Name,
    });

    // console.log(createdUser.user);

    let body = {
      displayName: createdUser.user.multiFactor.user.displayName,
      email: createdUser.user.multiFactor.user.email,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post('/api/user/register', body)
    .then((response) => {
      setFlag(false);
      if (response.data.success) {
        // 회원가입 성공시
        alert('회원가입이 성공하였습니다!');
        navigate('/login');
      }
      else {
        // 회원가입 실패시
        return alert('회원가입이 실패하였습니다.');
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label>이름</label>
        <input type="name" value={Name} autoFocus onChange={(e) => {setName(e.target.value)}}/>

        <label>이메일</label>
        <input type="email" value={Email} onChange={(e) => {setEmail(e.target.value)}} />

        <label>비밀번호</label>
        <input type="password" value={PW} required minLength={8} onChange={(e) => {setPW(e.target.value)}} />

        <label>비밀번호 확인</label>
        <input type="password" value={PWConfirm} required minLength={8} onChange={(e) => {setPWConfirm(e.target.value)}} />

        <button disabled={Flag} onClick={(e) => {RegisterFunc(e);}}>회원가입</button>
      </form>
    </LoginDiv>
  );
}

export default Register