import React, { useState } from 'react'

function Test() {
  const [Content, setContent] = useState("");
  const [ContentList, setContentList] = useState([]);

  const onSubmit = () => {
    let copy = [...ContentList];
    copy.push(Content);
    setContentList(copy);
  };

  return (
    <div style={ {display : 'flex', flexDirection : 'column', alignItems : 'center', width: '100%'} }>
      {
        ContentList.map((content, index) => {
          return(
            <div style={ {width: '100%', marginLeft: '1rem', marginBottom: '1rem'} } key={index}>내용 : {content}<hr /></div>
          )
        })
      }

      <input type="text" onChange={(e) => {setContent(e.target.value)}}/>
      <button style={ {marginTop: '1rem'} } onClick={() => {onSubmit();}}>제출!</button>
    </div>
  )
}

export default Test