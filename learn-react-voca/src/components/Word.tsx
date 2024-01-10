import React, { useState } from 'react';
import axios from 'axios';
import { IWord } from '../types/Type';

interface IProps {
  word: IWord;
}

function Word({ word: w }: IProps) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(word.isDone);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  const toggleDone = async () => {
    await axios
      .put(`http://localhost:5000/words/${word.id}`, {
        ...word,
        isDone: !isDone,
      })
      .then((res) => {
        if (res.statusText === 'OK') {
          setIsDone(!isDone);
        }
      })
      .catch((e) => console.log(e));

    // ? axios 파라미터
    // const response = await axios({
    //   method: 'PUT',
    //   url: `http://localhost:5000/words/${word.id}`,
    //   data: {
    //     ...word,
    //     isDone: !isDone,
    //   },
    // }).then((res) => {
    //   if (res.statusText === 'OK') {
    //     setIsDone(!isDone);
    //   }
    // });

    // ? fetch 사용
    // fetch(`http://localhost:5000/words/${word.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ...word,
    //     isDone: !isDone,
    //   }),
    // }).then((res) => {
    //   if (res.ok) {
    //     setIsDone(!isDone);
    //   }
    // });
  };

  const del = () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      fetch(`http://localhost:5000/words/${word.id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          setWord({
            ...word,
            id: 0,
          });
        }
      });
    }
  };

  if (word.id === null) return null;

  return (
    <tr key={word.id} className={isDone ? 'off' : ''}>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button type="button" onClick={toggleShow}>
          뜻 {isShow ? '숨기기' : '보기'}
        </button>
        <button type="button" className="btn_del" onClick={del}>
          삭제
        </button>
      </td>
    </tr>
  );
}

export default Word;
