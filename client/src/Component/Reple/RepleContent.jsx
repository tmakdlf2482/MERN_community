import React, { useState, useEffect, useRef } from 'react';
import { RepleContentDiv } from '../../Style/RepleCSS.js';
import { useSelector } from 'react-redux';

// modal을 다른곳을 클릭하면 열었던 모달은 닫히고 클릭한 모달이 열려야함 -> useOnClickOutside hook으로 구현

function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  return (
    <RepleContentDiv>
      <div className="author">
        <p>{props.reple.author.displayName}</p>
        {
          props.reple.author.uid === user.uid &&
          <div className="modalControl">
            <span onClick={() => {setModalFlag(true)}}>···</span>
            {ModalFlag &&
              <div className="modalDiv" ref={ref}>
                <p>수정</p>
                <p className="delete">삭제</p>
              </div>
            }
          </div>
        }
      </div>
      <p>{props.reple.reple}</p>
    </RepleContentDiv>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart',listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default RepleContent;