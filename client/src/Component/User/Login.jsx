import React, { useState, useEffect } from 'react'
import LoginDiv from '../../Style/UserCSS.js';
import { useNavigate } from 'react-router-dom';

import firebase from '../../firebase.js';

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();

    if ( !(Email && PW) ) {
      return alert("이메일과 비밀번호를 입력해주세요.");
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      }
      else if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      }
      else { // error.code === "auth/invalid-credential"
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  }, [ErrorMsg]);
  

  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input type="email" value={Email} required autoFocus onChange={(e) => {setEmail(e.target.value);}} />

        <label>비밀번호</label>
        <input type="password" value={PW} required onChange={(e) => {setPW(e.target.value);}} />

        {ErrorMsg != "" && <p>{ErrorMsg}</p>} {/* ErrorMsg에 내용이 있으면 ErrorMsg 출력 */}
        <button onClick={(e) => {SignInFunc(e);}}>로그인</button>
        <button onClick={(e) => {e.preventDefault(); navigate('/register');}}>회원가입</button>
      </form>
    </LoginDiv>
  );
}

export default Login