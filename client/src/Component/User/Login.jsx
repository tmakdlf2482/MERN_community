import React, { useState } from 'react'
import LoginDiv from '../../Style/UserCSS.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  let navigate = useNavigate();

  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input type="email" value={Email} autoFocus onChange={(e) => {setEmail(e.target.value);}} />

        <label>비밀번호</label>
        <input type="password" value={PW} onChange={(e) => {setPW(e.target.value);}} />

        <button>로그인</button>
        <button onClick={(e) => {e.preventDefault(); navigate('/register');}}>회원가입</button>
      </form>
    </LoginDiv>
  );
}

export default Login