import React from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ImageUpload(props) {
  /* 
    1. 사용자가 이미지를 업로드
    2. 업로드한 이미지를 받아서 서버에서 저장
    3. 저장한 이미지의 경로를 다시 클라이언트에게 전송
    4. 경로를 받아서 post model에 저장
  */

  const FileUpload = (e) => {
    // 사용자가 이미지를 업로드 하였을 때, 그 이미지 객체에 관한 정보는 e.target.files의 배열에 담겨져 있음
    // console.log(e.target.files);

    // 이미지 파일을 서버로 보내줄 때에는 FormData()를 만들어 줄 예정
    // FormData는 key/value쌍으로써, 파일 입력 내용을 인코딩함
    // var formData = new FormData();
    // formData.append('key', '값'); 으로 값 추가
    var formData = new FormData();
    formData.append('file', (e.target.files[0]));
    // console.log(formData); // 빈 object로 나오는데, 이유는 FormData는 XMLHttpRequest라고 해서 전송할 key/value의 집합을 컴파일한 특수한 객체, 문자열로는 표현 못함
    // for(const keyValue of formData) {
    //   console.log(keyValue);
    // }

    axios.post('/api/post/image/upload', formData)
    .then((response) => {
      props.setImage(response.data.filePath); // filePath: res.req.file.location
    });
  };

  return (
    <div>
      {/* className='shadow-none'을 하게 되면 클릭시 파란색 그림자가 없어짐 */}
      {/* accept에 어떤 유형의 파일을 input태그에 관리할 것인가 지정, 여기서는 이미지만 관리할 예정(png, jpg, jpeg만 선택 가능) */}
      {/* input에 onChange가 발생하면 axios 통신을 해서 서버에 이미지 저장 */}
      <Form.Control type="file" className='shadow-none' accept='image/*' onChange={(e) => {FileUpload(e)}} />
    </div>
  )
}

export default ImageUpload